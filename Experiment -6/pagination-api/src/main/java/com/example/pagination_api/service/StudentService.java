package com.example.pagination_api.service;

import com.example.pagination_api.entity.Student;
import com.example.pagination_api.repository.StudentRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Page<Student> getStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }
}