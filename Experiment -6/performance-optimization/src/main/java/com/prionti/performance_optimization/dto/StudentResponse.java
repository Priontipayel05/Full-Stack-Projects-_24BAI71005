package com.prionti.performance_optimization.dto;

public class StudentResponse {

    private Long id;
    private String name;
    private String email;
    private String course;
    private int age;
    private Long departmentId;
    private String departmentName;

    public StudentResponse() {
    }

    public StudentResponse(
            Long id,
            String name,
            String email,
            String course,
            int age,
            Long departmentId,
            String departmentName) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
        this.age = age;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCourse() {
        return course;
    }

    public int getAge() {
        return age;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }
}