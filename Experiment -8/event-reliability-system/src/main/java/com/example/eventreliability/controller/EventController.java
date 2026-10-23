
package com.example.eventreliability.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eventreliability.model.EventMessage;
import com.example.eventreliability.service.EventReliabilityService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventReliabilityService service;

    public EventController(EventReliabilityService service) {
        this.service = service;
    }

    @PostMapping
    public Map<String, Object> submitEvent(
            @RequestBody EventMessage event) {
        return service.processEvent(event);
    }

    @GetMapping("/dlq")
    public List<Map<String, Object>> getDeadLetterQueue() {
        return service.getDeadLetterQueue();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return Map.of(
                "processedEvents", service.getProcessedEventCount(),
                "deadLetterQueueSize",
                service.getDeadLetterQueue().size()
        );
    }
}
