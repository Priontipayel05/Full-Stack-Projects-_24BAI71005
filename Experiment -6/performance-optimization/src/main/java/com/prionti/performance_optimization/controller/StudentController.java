package com.prionti.performance_optimization.controller;

import com.prionti.performance_optimization.dto.StudentRequest;
import com.prionti.performance_optimization.dto.StudentResponse;
import com.prionti.performance_optimization.service.StudentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(
            StudentService studentService) {

        this.studentService = studentService;
    }

    // ---------------------------------------------------------
    // ADD STUDENT
    // ---------------------------------------------------------

    @PostMapping
    public ResponseEntity<StudentResponse> addStudent(
            @RequestBody StudentRequest request) {

        StudentResponse response =
                studentService.addStudent(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ---------------------------------------------------------
    // NORMAL QUERY
    // ---------------------------------------------------------

    @GetMapping("/normal")
    public List<StudentResponse> getNormalStudents() {

        return studentService.getStudentsNormal();
    }

    // ---------------------------------------------------------
    // OPTIMIZED JOIN FETCH QUERY
    // ---------------------------------------------------------

    @GetMapping("/optimized")
    public List<StudentResponse> getOptimizedStudents() {

        return studentService.getStudentsOptimized();
    }

    // ---------------------------------------------------------
    // NATIVE SQL QUERY
    // ---------------------------------------------------------

    @GetMapping("/native")
    public List<StudentResponse> getNativeStudents() {

        return studentService.getStudentsNative();
    }

    // ---------------------------------------------------------
    // GET STUDENT BY ID
    // ---------------------------------------------------------

    @GetMapping("/{id}")
    public StudentResponse getStudent(
            @PathVariable Long id) {

        return studentService.getStudentById(id);
    }

    // ---------------------------------------------------------
    // CLEAR CACHE
    // ---------------------------------------------------------

    @DeleteMapping("/cache")
    public String clearCache() {

        studentService.clearCache();

        return "Student cache cleared successfully";
    }
}