package com.example.demo.dto;

public class AcceptedRequestDTO {

    private Integer requestId;
    private Integer learnerId;
    private String learnerName;

    public AcceptedRequestDTO(Integer requestId, Integer learnerId, String learnerName) {
        this.requestId = requestId;
        this.learnerId = learnerId;
        this.learnerName = learnerName;
    }

    public Integer getRequestId() {
        return requestId;
    }

    public Integer getLearnerId() {
        return learnerId;
    }

    public String getLearnerName() {
        return learnerName;
    }
}
