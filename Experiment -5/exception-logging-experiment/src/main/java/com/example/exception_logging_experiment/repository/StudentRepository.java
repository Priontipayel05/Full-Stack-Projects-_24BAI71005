package com.example.exception_logging_experiment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exception_logging_experiment.entity.Student;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

}