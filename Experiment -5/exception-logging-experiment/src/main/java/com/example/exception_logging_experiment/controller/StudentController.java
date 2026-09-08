package com.example.exception_logging_experiment.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exception_logging_experiment.dto.StudentRequest;
import com.example.exception_logging_experiment.entity.Student;
import com.example.exception_logging_experiment.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private static final Logger logger =
            LoggerFactory.getLogger(
                    StudentController.class
            );

    private final StudentService studentService;


    public StudentController(
            StudentService studentService) {

        this.studentService =
                studentService;
    }


    @GetMapping
    public ResponseEntity<List<Student>>
    getAllStudents() {

        logger.info("GET /api/students");

        return ResponseEntity.ok(
                studentService.getAllStudents()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<Student>
    getStudentById(
            @PathVariable Long id) {

        logger.info(
                "GET /api/students/{}",
                id
        );

        return ResponseEntity.ok(
                studentService.getStudentById(id)
        );
    }


    @PostMapping
    public ResponseEntity<Student>
    createStudent(
            @Valid @RequestBody StudentRequest request) {

        logger.info(
                "POST /api/students"
        );

        Student student =
                studentService.createStudent(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(student);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Student>
    updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request) {

        logger.info(
                "PUT /api/students/{}",
                id
        );

        Student student =
                studentService.updateStudent(
                        id,
                        request
                );

        return ResponseEntity.ok(student);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteStudent(
            @PathVariable Long id) {

        logger.info(
                "DELETE /api/students/{}",
                id
        );

        studentService.deleteStudent(id);

        return ResponseEntity.ok(
                "Student deleted successfully"
        );
    }
}