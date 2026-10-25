
package com.experiment.cd.controller;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class DeploymentController {

    @Value("${app.stable.version:1.0.0}")
    private String stableVersion;

    @Value("${app.canary.version:2.0.0}")
    private String canaryVersion;

    @Value("${app.canary.weight:10}")
    private volatile int canaryWeight;

    private final AtomicLong stableRequests = new AtomicLong();
    private final AtomicLong canaryRequests = new AtomicLong();

    @GetMapping("/api/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", "UP");
        result.put("service", "DeployFlow");
        result.put("timestamp", Instant.now().toString());
        return result;
    }

    @GetMapping("/api/version")
    public Map<String, Object> version() {
        return routeRequest();
    }

    @GetMapping("/api/deployment")
    public Map<String, Object> deployment() {
        Map<String, Object> result = routeRequest();
        result.put("message", "Request served successfully");
        return result;
    }

    private Map<String, Object> routeRequest() {
        int weight = Math.max(0, Math.min(100, canaryWeight));

        boolean useCanary =
                ThreadLocalRandom.current().nextInt(100) < weight;

        String release = useCanary ? "canary" : "stable";
        String version = useCanary ? canaryVersion : stableVersion;

        if (useCanary) {
            canaryRequests.incrementAndGet();
        } else {
            stableRequests.incrementAndGet();
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("application", "DeployFlow");
        result.put("release", release);
        result.put("version", version);
        result.put("canaryWeight", weight);
        result.put("stableWeight", 100 - weight);
        result.put("timestamp", Instant.now().toString());

        return result;
    }

    @GetMapping("/api/deployment/stats")
    public Map<String, Object> statistics() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("stableRequests", stableRequests.get());
        result.put("canaryRequests", canaryRequests.get());
        result.put("totalRequests",
                stableRequests.get() + canaryRequests.get());
        result.put("canaryWeight", canaryWeight);
        result.put("stableWeight", 100 - canaryWeight);
        result.put("timestamp", Instant.now().toString());
        return result;
    }

    @PostMapping("/api/deployment/weight")
    public Map<String, Object> updateWeight(
            @RequestParam int canaryWeight) {

        if (canaryWeight < 0 || canaryWeight > 100) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Canary weight must be between 0 and 100");
        }

        this.canaryWeight = canaryWeight;

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", "Traffic allocation updated");
        result.put("canaryWeight", canaryWeight);
        result.put("stableWeight", 100 - canaryWeight);
        result.put("timestamp", Instant.now().toString());

        return result;
    }

    @PostMapping("/api/deployment/simulate")
    public Map<String, Object> simulate(
            @RequestParam(defaultValue = "1") int count) {

        if (count < 1 || count > 500) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Count must be between 1 and 500");
        }

        for (int i = 0; i < count; i++) {
            routeRequest();
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", count + " simulated requests completed");
        result.put("simulatedRequests", count);
        result.put("stats", statistics());

        return result;
    }

    @PostMapping("/api/deployment/reset")
    public Map<String, Object> resetStatistics() {
        stableRequests.set(0);
        canaryRequests.set(0);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", "Request counters reset");
        result.put("stats", statistics());

        return result;
    }
}
