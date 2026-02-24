package com.schoolmgmt.service;

import com.schoolmgmt.model.SchoolClass;
import com.schoolmgmt.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<SchoolClass> getAllClasses() {
        return classRepository.findAll();
    }

    public Optional<SchoolClass> getClassById(Long id) {
        return classRepository.findById(id);
    }

    public SchoolClass createClass(SchoolClass schoolClass) {
        return classRepository.save(schoolClass);
    }

    public SchoolClass updateClass(Long id, SchoolClass classDetails) {
        SchoolClass schoolClass = classRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found with id " + id));
        schoolClass.setName(classDetails.getName());
        schoolClass.setGrade(classDetails.getGrade());
        return classRepository.save(schoolClass);
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}
