package com.example.exception_logging_experiment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExceptionLoggingExperimentApplication {

    public static void main(String[] args) {
        SpringApplication.run(
                ExceptionLoggingExperimentApplication.class,
                args
        );
    }
}