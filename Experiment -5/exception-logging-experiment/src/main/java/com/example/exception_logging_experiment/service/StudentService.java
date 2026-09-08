package com.example.exception_logging_experiment.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.exception_logging_experiment.dto.StudentRequest;
import com.example.exception_logging_experiment.entity.Student;
import com.example.exception_logging_experiment.exception.StudentNotFoundException;
import com.example.exception_logging_experiment.repository.StudentRepository;

@Service
public class StudentService {

    private static final Logger logger =
            LoggerFactory.getLogger(
                    StudentService.class
            );

    private final StudentRepository studentRepository;


    public StudentService(
            StudentRepository studentRepository) {

        this.studentRepository =
                studentRepository;
    }


    public List<Student> getAllStudents() {

        logger.info("Fetching all students");

        return studentRepository.findAll();
    }


    public Student getStudentById(Long id) {

        logger.info(
                "Fetching student with id={}",
                id
        );

        return studentRepository
                .findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student not found with id: "
                                        + id
                        )
                );
    }


    public Student createStudent(
            StudentRequest request) {

        logger.info(
                "Creating student with email={}",
                request.getEmail()
        );

        Student student =
                new Student();

        student.setName(
                request.getName()
        );

        student.setEmail(
                request.getEmail()
        );

        student.setCourse(
                request.getCourse()
        );

        student.setAge(
                request.getAge()
        );

        return studentRepository.save(student);
    }


    public Student updateStudent(
            Long id,
            StudentRequest request) {

        logger.info(
                "Updating student id={}",
                id
        );

        Student student =
                getStudentById(id);

        student.setName(
                request.getName()
        );

        student.setEmail(
                request.getEmail()
        );

        student.setCourse(
                request.getCourse()
        );

        student.setAge(
                request.getAge()
        );

        return studentRepository.save(student);
    }


    public void deleteStudent(Long id) {

        logger.info(
                "Deleting student id={}",
                id
        );

        Student student =
                getStudentById(id);

        studentRepository.delete(student);

        logger.info(
                "Student deleted successfully id={}",
                id
        );
    }
}