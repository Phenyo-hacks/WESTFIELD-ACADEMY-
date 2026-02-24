package com.schoolmgmt.service;

import com.schoolmgmt.model.Subject;
import com.schoolmgmt.model.SchoolClass;
import com.schoolmgmt.repository.SubjectRepository;
import com.schoolmgmt.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ClassRepository classRepository;

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }

    public Subject createSubject(Subject subject) {
        if (subject.getSchoolClass() != null && subject.getSchoolClass().getId() != null) {
            SchoolClass schoolClass = classRepository.findById(subject.getSchoolClass().getId())
                    .orElseThrow(() -> new RuntimeException("Class not found for subject creation"));
            subject.setSchoolClass(schoolClass);
        }
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, Subject subjectDetails) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id " + id));
        subject.setName(subjectDetails.getName());

        if (subjectDetails.getSchoolClass() != null && subjectDetails.getSchoolClass().getId() != null) {
            SchoolClass schoolClass = classRepository.findById(subjectDetails.getSchoolClass().getId())
                    .orElseThrow(() -> new RuntimeException("Class not found for subject update"));
            subject.setSchoolClass(schoolClass);
        } else if (subjectDetails.getSchoolClass() == null) {
            subject.setSchoolClass(null); // Allow disassociating from a class
        }

        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    public List<Subject> getSubjectsByClass(Long classId) {
        return subjectRepository.findBySchoolClassId(classId);
    }
}
