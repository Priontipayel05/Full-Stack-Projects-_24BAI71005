package com.prionti.performance_optimization.service;

import com.prionti.performance_optimization.dto.StudentRequest;
import com.prionti.performance_optimization.dto.StudentResponse;
import com.prionti.performance_optimization.entity.Department;
import com.prionti.performance_optimization.entity.Student;
import com.prionti.performance_optimization.repository.DepartmentRepository;
import com.prionti.performance_optimization.repository.StudentRepository;

import org.ehcache.Cache;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;
    private final Cache<Long, String> studentCache;

    public StudentService(
            StudentRepository studentRepository,
            DepartmentRepository departmentRepository,
            Cache<Long, String> studentCache) {

        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
        this.studentCache = studentCache;
    }

    // ---------------------------------------------------------
    // ADD STUDENT
    // ---------------------------------------------------------

    @Transactional
    public StudentResponse addStudent(StudentRequest request) {

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException(
                        "Department not found with ID: "
                                + request.getDepartmentId()
                ));

        Student student = new Student();

        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setCourse(request.getCourse());
        student.setAge(request.getAge());
        student.setDepartment(department);

        Student savedStudent = studentRepository.save(student);

        return toResponse(savedStudent);
    }

    // ---------------------------------------------------------
    // NORMAL QUERY
    // ---------------------------------------------------------

    @Transactional(readOnly = true)
    public List<StudentResponse> getStudentsNormal() {

        List<Student> students =
                studentRepository.findStudentsNormal();

        List<StudentResponse> result = new ArrayList<>();

        for (Student student : students) {
            result.add(toResponse(student));
        }

        return result;
    }

    // ---------------------------------------------------------
    // OPTIMIZED QUERY USING JOIN FETCH
    // ---------------------------------------------------------

    @Transactional(readOnly = true)
    public List<StudentResponse> getStudentsOptimized() {

        List<Student> students =
                studentRepository.findStudentsWithDepartment();

        List<StudentResponse> result = new ArrayList<>();

        for (Student student : students) {
            result.add(toResponse(student));
        }

        return result;
    }

    // ---------------------------------------------------------
    // NATIVE SQL QUERY
    // ---------------------------------------------------------

    @Transactional(readOnly = true)
    public List<StudentResponse> getStudentsNative() {

        List<Object[]> rows =
                studentRepository.findStudentsUsingNativeQuery();

        List<StudentResponse> result = new ArrayList<>();

        for (Object[] row : rows) {

            Long id = ((Number) row[0]).longValue();

            String name = (String) row[1];

            String email = (String) row[2];

            String course = (String) row[3];

            int age = ((Number) row[4]).intValue();

            Long departmentId =
                    ((Number) row[5]).longValue();

            String departmentName =
                    (String) row[6];

            result.add(
                    new StudentResponse(
                            id,
                            name,
                            email,
                            course,
                            age,
                            departmentId,
                            departmentName
                    )
            );
        }

        return result;
    }

    // ---------------------------------------------------------
    // GET STUDENT BY ID WITH CACHE
    // ---------------------------------------------------------

    @Transactional(readOnly = true)
    public StudentResponse getStudentById(Long id) {

        String cachedStudent =
                studentCache.get(id);

        // CACHE HIT
        if (cachedStudent != null) {

            System.out.println(
                    "CACHE HIT - Student ID: " + id
            );

            return parseCachedStudent(cachedStudent);
        }

        // CACHE MISS
        System.out.println(
                "CACHE MISS - Student ID: " + id
        );

        Student student =
                studentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found with ID: "
                                                + id
                                )
                        );

        StudentResponse response =
                toResponse(student);

        String cacheValue =
                response.getId() + "|" +
                response.getName() + "|" +
                response.getEmail() + "|" +
                response.getCourse() + "|" +
                response.getAge() + "|" +
                response.getDepartmentId() + "|" +
                response.getDepartmentName();

        studentCache.put(
                id,
                cacheValue
        );

        return response;
    }

    // ---------------------------------------------------------
    // CLEAR CACHE
    // ---------------------------------------------------------

    public void clearCache() {

        studentCache.clear();

        System.out.println("CACHE CLEARED");
    }

    // ---------------------------------------------------------
    // CONVERT STUDENT TO RESPONSE DTO
    // ---------------------------------------------------------

    private StudentResponse toResponse(
            Student student) {

        return new StudentResponse(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getCourse(),
                student.getAge(),
                student.getDepartment().getId(),
                student.getDepartment().getName()
        );
    }

    // ---------------------------------------------------------
    // CONVERT CACHE STRING TO RESPONSE DTO
    // ---------------------------------------------------------

    private StudentResponse parseCachedStudent(
            String value) {

        String[] data =
                value.split("\\|", -1);

        return new StudentResponse(
                Long.parseLong(data[0]),
                data[1],
                data[2],
                data[3],
                Integer.parseInt(data[4]),
                Long.parseLong(data[5]),
                data[6]
        );
    }
}