package com.varun.studentDB.service;

import com.varun.studentDB.model.Student;

import java.util.List;

public interface StudentService {

    public Student saveStudent(Student student);

    public List<Student> getAllStudent();
}
