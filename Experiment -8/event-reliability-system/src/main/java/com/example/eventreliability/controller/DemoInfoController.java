
package com.example.eventreliability.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoInfoController {

    @GetMapping("/api/demo")
    public Map<String, String> getDemoInfo() {
        return Map.of(
                "studentName", "Prionti Das",
                "uid", "24BAI71005",
                "project", "Event Reliability System"
        );
    }
}
