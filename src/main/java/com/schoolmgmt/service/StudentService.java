package com.schoolmgmt.service;

import com.schoolmgmt.model.Student;
import com.schoolmgmt.model.SchoolClass;
import com.schoolmgmt.model.User;
import com.schoolmgmt.repository.StudentRepository;
import com.schoolmgmt.repository.ClassRepository;
import com.schoolmgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClassRepository classRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student createStudent(Student student) {
        // Ensure User and SchoolClass exist before saving Student
        User user = userRepository.findById(student.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found for student creation"));
        SchoolClass schoolClass = classRepository.findById(student.getSchoolClass().getId())
                .orElseThrow(() -> new RuntimeException("Class not found for student creation"));

        student.setUser(user);
        student.setSchoolClass(schoolClass);
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + id));

        student.setName(studentDetails.getName());
        student.setRollNo(studentDetails.getRollNo());
        student.setContactNumber(studentDetails.getContactNumber());
        student.setAddress(studentDetails.getAddress());
        student.setGuardianName(studentDetails.getGuardianName());
        student.setGuardianContact(studentDetails.getGuardianContact());

        // Update User and SchoolClass if provided
        if (studentDetails.getUser() != null && studentDetails.getUser().getId() != null) {
            User user = userRepository.findById(studentDetails.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found for student update"));
            student.setUser(user);
        }
        if (studentDetails.getSchoolClass() != null && studentDetails.getSchoolClass().getId() != null) {
            SchoolClass schoolClass = classRepository.findById(studentDetails.getSchoolClass().getId())
                    .orElseThrow(() -> new RuntimeException("Class not found for student update"));
            student.setSchoolClass(schoolClass);
        }

        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public List<Student> getStudentsByClass(Long classId) {
        return studentRepository.findBySchoolClassId(classId);
    }
}
