package com.example.eventreliability.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.example.eventreliability.model.EventMessage;
import com.example.eventreliability.model.FailureMode;

import jakarta.annotation.PreDestroy;

@Service
public class EventReliabilityService {

    private static final int MAX_ATTEMPTS = 4;
    private static final long INITIAL_BACKOFF_SECONDS = 1;

    private final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(2, task -> {
                Thread thread = new Thread(task, "event-worker");
                thread.setDaemon(true);
                return thread;
            });

    // Successfully processed event IDs.
    private final Set<String> processedEventIds =
            ConcurrentHashMap.newKeySet();

    // Events waiting for processing or retry.
    private final Map<String, ProcessingState> activeEvents =
            new ConcurrentHashMap<>();

    // Latest status for each event.
    private final Map<String, Map<String, Object>> latestStatuses =
            new ConcurrentHashMap<>();

    // Processing history and simulated DLQ.
    private final List<Map<String, Object>> history =
            new CopyOnWriteArrayList<>();

    private final List<Map<String, Object>> deadLetterEvents =
            new CopyOnWriteArrayList<>();

    /*
     * Accept a new event.
     * Prevent a duplicate while an event is in progress
     * or after it has been processed successfully.
     */
    public synchronized Map<String, Object> publish(
            EventMessage event) {

        String eventId = event.getEventId();

        if (processedEventIds.contains(eventId)
                || activeEvents.containsKey(eventId)) {

            record(
                    eventId,
                    "DUPLICATE_SKIPPED",
                    "This event ID is already processed or in progress."
            );

            return response(
                    "DUPLICATE_SKIPPED",
                    eventId,
                    "Duplicate processing prevented."
            );
        }

        ProcessingState state = new ProcessingState(event);

        activeEvents.put(eventId, state);

        record(
                eventId,
                "QUEUED",
                "Event accepted and waiting for processing."
        );

        scheduler.schedule(
                () -> process(state),
                0,
                TimeUnit.MILLISECONDS
        );

        return response(
                "PUBLISHED",
                eventId,
                "Event accepted for processing."
        );
    }

    /*
     * Process an event or a scheduled retry.
     */
    private void process(ProcessingState state) {

        EventMessage event = state.event;
        String eventId = event.getEventId();

        state.attempts++;

        record(
                eventId,
                "PROCESSING_ATTEMPT",
                "Processing attempt " + state.attempts
        );

        try {

            FailureMode mode = event.getFailureMode() == null
                    ? FailureMode.NONE
                    : event.getFailureMode();

            // First two attempts fail for transient events.
            if (mode == FailureMode.TRANSIENT
                    && state.attempts <= 2) {

                throw new RuntimeException(
                        "Simulated temporary processing failure."
                );
            }

            // Permanent failure on every attempt.
            if (mode == FailureMode.ALWAYS) {

                throw new RuntimeException(
                        "Simulated permanent processing failure."
                );
            }

            // Place the application's real business logic here.
            System.out.println(
                    "SUCCESS: " + eventId + " - " + event.getMessage()
            );

            processedEventIds.add(eventId);
            activeEvents.remove(eventId, state);

            record(
                    eventId,
                    "PROCESSED",
                    "Event processed successfully on attempt "
                            + state.attempts
            );

        } catch (RuntimeException exception) {

            if (state.attempts < MAX_ATTEMPTS) {

                // Exponential backoff: 1 second, 2 seconds, 4 seconds.
                long delaySeconds =
                        INITIAL_BACKOFF_SECONDS
                                * (1L << (state.attempts - 1));

                record(
                        eventId,
                        "RETRY_SCHEDULED",
                        "Attempt " + state.attempts
                                + " failed. Next retry in "
                                + delaySeconds + " second(s)."
                );

                scheduler.schedule(
                        () -> process(state),
                        delaySeconds,
                        TimeUnit.SECONDS
                );

            } else {

                // All attempts exhausted: send to simulated DLQ.
                Map<String, Object> deadLetter =
                        new LinkedHashMap<>();

                deadLetter.put("eventId", eventId);
                deadLetter.put("message", event.getMessage());
                deadLetter.put(
                        "failureMode",
                        event.getFailureMode() == null
                                ? "NONE"
                                : event.getFailureMode().name()
                );
                deadLetter.put("topic", "SIMULATED-DLQ");
                deadLetter.put(
                        "reason",
                        exception.getMessage()
                );
                deadLetter.put("time", Instant.now().toString());

                deadLetterEvents.add(deadLetter);
                activeEvents.remove(eventId, state);

                record(
                        eventId,
                        "SENT_TO_DLT",
                        "All " + MAX_ATTEMPTS
                                + " processing attempts failed."
                );
            }
        }
    }

    private void record(
            String eventId,
            String status,
            String detail) {

        Map<String, Object> entry = new LinkedHashMap<>();

        entry.put("eventId", eventId);
        entry.put("status", status);
        entry.put("detail", detail);
        entry.put("time", Instant.now().toString());

        Map<String, Object> snapshot = Map.copyOf(entry);

        history.add(snapshot);
        latestStatuses.put(eventId, snapshot);
    }

    private Map<String, Object> response(
            String status,
            String eventId,
            String message) {

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("status", status);
        result.put("eventId", eventId);
        result.put("message", message);

        return result;
    }

    public List<Map<String, Object>> getStatuses() {
        return new ArrayList<>(latestStatuses.values());
    }

    public List<Map<String, Object>> getHistory() {
        return new ArrayList<>(history);
    }

    public List<Map<String, Object>> getDeadLetterEvents() {
        return new ArrayList<>(deadLetterEvents);
    }

    @PreDestroy
    public void stopScheduler() {
        scheduler.shutdownNow();
    }

    private static class ProcessingState {

        private final EventMessage event;
        private int attempts = 0;

        private ProcessingState(EventMessage event) {
            this.event = event;
        }
    }
}