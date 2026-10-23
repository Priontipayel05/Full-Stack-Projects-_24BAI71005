
package com.example.eventreliability.model;

public class EventMessage {

    private String eventId;
    private String message;
    private String failureMode;

    public EventMessage() {
    }

    public EventMessage(String eventId, String message, String failureMode) {
        this.eventId = eventId;
        this.message = message;
        this.failureMode = failureMode;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFailureMode() {
        return failureMode;
    }

    public void setFailureMode(String failureMode) {
        this.failureMode = failureMode;
    }
}
