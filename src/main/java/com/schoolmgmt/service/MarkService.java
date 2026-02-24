package com.schoolmgmt.service;

import com.schoolmgmt.model.Mark;
import com.schoolmgmt.model.Student;
import com.schoolmgmt.model.Subject;
import com.schoolmgmt.repository.MarkRepository;
import com.schoolmgmt.repository.StudentRepository;
import com.schoolmgmt.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService {

    @Autowired
    private MarkRepository markRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }

    public Optional<Mark> getMarkById(Long id) {
        return markRepository.findById(id);
    }

    public Mark createMark(Mark mark) {
        Student student = studentRepository.findById(mark.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found for mark creation"));
        Subject subject = subjectRepository.findById(mark.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found for mark creation"));

        mark.setStudent(student);
        mark.setSubject(subject);
        return markRepository.save(mark);
    }

    public Mark updateMark(Long id, Mark markDetails) {
        Mark mark = markRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mark not found with id " + id));

        mark.setScore(markDetails.getScore());
        mark.setTerm(markDetails.getTerm());

        if (markDetails.getStudent() != null && markDetails.getStudent().getId() != null) {
            Student student = studentRepository.findById(markDetails.getStudent().getId())
                    .orElseThrow(() -> new RuntimeException("Student not found for mark update"));
            mark.setStudent(student);
        }
        if (markDetails.getSubject() != null && markDetails.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(markDetails.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found for mark update"));
            mark.setSubject(subject);
        }

        return markRepository.save(mark);
    }

    public void deleteMark(Long id) {
        markRepository.deleteById(id);
    }

    public List<Mark> getMarksByStudentId(Long studentId) {
        return markRepository.findByStudentId(studentId);
    }
}
