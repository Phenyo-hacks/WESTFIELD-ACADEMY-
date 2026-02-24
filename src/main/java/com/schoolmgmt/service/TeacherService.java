package com.schoolmgmt.service;

import com.schoolmgmt.model.Teacher;
import com.schoolmgmt.model.User;
import com.schoolmgmt.repository.TeacherRepository;
import com.schoolmgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> getTeacherById(Long id) {
        return teacherRepository.findById(id);
    }

    public Teacher createTeacher(Teacher teacher) {
        User user = userRepository.findById(teacher.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found for teacher creation"));
        teacher.setUser(user);
        return teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(Long id, Teacher teacherDetails) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id " + id));

        teacher.setDepartment(teacherDetails.getDepartment());
        teacher.setContactNumber(teacherDetails.getContactNumber());
        teacher.setAddress(teacherDetails.getAddress());

        if (teacherDetails.getUser() != null && teacherDetails.getUser().getId() != null) {
            User user = userRepository.findById(teacherDetails.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found for teacher update"));
            teacher.setUser(user);
        }

        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    public Optional<Teacher> getTeacherByUserId(Long userId) {
        return teacherRepository.findByUserId(userId);
    }
}
