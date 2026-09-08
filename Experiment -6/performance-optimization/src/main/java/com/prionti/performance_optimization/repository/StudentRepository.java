package com.prionti.performance_optimization.repository;

import com.prionti.performance_optimization.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s")
    List<Student> findStudentsNormal();

    @Query("""
            SELECT s
            FROM Student s
            JOIN FETCH s.department
            """)
    List<Student> findStudentsWithDepartment();

    @Query(
            value = """
                    SELECT
                        s.id,
                        s.name,
                        s.email,
                        s.course,
                        s.age,
                        d.id AS department_id,
                        d.name AS department_name
                    FROM students s
                    JOIN departments d
                    ON s.department_id = d.id
                    ORDER BY s.id
                    """,
            nativeQuery = true
    )
    List<Object[]> findStudentsUsingNativeQuery();
}