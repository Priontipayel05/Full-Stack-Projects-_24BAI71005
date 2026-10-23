package com.example.eventreliability.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eventreliability.model.EventMessage;
import com.example.eventreliability.model.FailureMode;
import com.example.eventreliability.service.EventReliabilityService;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventReliabilityService service;

    public EventController(EventReliabilityService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> publish(
            @RequestBody EventMessage event) {

        if (event.getEventId() == null
                || event.getEventId().isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("error", "eventId is required.")
            );
        }

        if (event.getMessage() == null
                || event.getMessage().isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("error", "message is required.")
            );
        }

        event.setEventId(event.getEventId().trim());
        event.setMessage(event.getMessage().trim());

        if (event.getFailureMode() == null) {
            event.setFailureMode(FailureMode.NONE);
        }

        Map<String, Object> result = service.publish(event);

        if ("DUPLICATE_SKIPPED".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
    }

    @GetMapping("/status")
    public List<Map<String, Object>> statuses() {
        return service.getStatuses();
    }

    @GetMapping("/history")
    public List<Map<String, Object>> history() {
        return service.getHistory();
    }

    @GetMapping("/dlq")
    public List<Map<String, Object>> deadLetterEvents() {
        return service.getDeadLetterEvents();
    }
}