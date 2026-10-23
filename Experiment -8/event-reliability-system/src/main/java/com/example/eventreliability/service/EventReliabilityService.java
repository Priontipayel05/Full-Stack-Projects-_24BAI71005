
package com.example.eventreliability.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.example.eventreliability.model.EventMessage;
import com.example.eventreliability.model.FailureMode;

@Service
public class EventReliabilityService {

    private final Set<String> processedEvents =
            ConcurrentHashMap.newKeySet();

    private final List<Map<String, Object>> deadLetterQueue =
            Collections.synchronizedList(new ArrayList<>());

    public Map<String, Object> processEvent(EventMessage event) {

        Map<String, Object> result = new LinkedHashMap<>();

        if (event.getEventId() == null ||
                event.getEventId().isBlank()) {
            result.put("status", "ERROR");
            result.put("message", "Event ID is required");
            return result;
        }

        if (!processedEvents.add(event.getEventId())) {
            result.put("status", "DUPLICATE");
            result.put("message",
                    "Duplicate event ignored using idempotency");
            result.put("eventId", event.getEventId());
            return result;
        }

        FailureMode mode;

        try {
            mode = event.getFailureMode() == null
                    ? FailureMode.NONE
                    : FailureMode.valueOf(
                            event.getFailureMode().toUpperCase());
        } catch (IllegalArgumentException ex) {
            processedEvents.remove(event.getEventId());
            result.put("status", "ERROR");
            result.put("message",
                    "Invalid failure mode. Use NONE, FAIL_ONCE, or ALWAYS_FAIL");
            return result;
        }

        int maxAttempts = 3;
        int attempts = 0;
        boolean success = false;
        List<String> logs = new ArrayList<>();

        while (attempts < maxAttempts && !success) {
            attempts++;

            boolean failed = mode == FailureMode.ALWAYS_FAIL
                    || (mode == FailureMode.FAIL_ONCE && attempts == 1);

            if (!failed) {
                success = true;
                logs.add("Attempt " + attempts + ": SUCCESS");
                break;
            }

            logs.add("Attempt " + attempts + ": FAILED");

            if (attempts < maxAttempts) {
                long delay = 500L * (1L << (attempts - 1));
                logs.add("Retry scheduled with backoff: "
                        + delay + " ms");

                try {
                    Thread.sleep(delay);
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }

        result.put("eventId", event.getEventId());
        result.put("attempts", attempts);
        result.put("logs", logs);

        if (success) {
            result.put("status", "SUCCESS");
            result.put("message", "Event processed successfully");
        } else {
            Map<String, Object> failedEvent = new LinkedHashMap<>();
            failedEvent.put("eventId", event.getEventId());
            failedEvent.put("message", event.getMessage());
            failedEvent.put("attempts", attempts);
            failedEvent.put("logs", new ArrayList<>(logs));

            deadLetterQueue.add(failedEvent);

            result.put("status", "DLQ");
            result.put("message",
                    "Maximum retries reached; event sent to DLQ");
        }

        return result;
    }

    public List<Map<String, Object>> getDeadLetterQueue() {
        synchronized (deadLetterQueue) {
            return new ArrayList<>(deadLetterQueue);
        }
    }

    public int getProcessedEventCount() {
        return processedEvents.size();
    }
}
