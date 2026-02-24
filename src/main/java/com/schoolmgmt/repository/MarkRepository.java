package com.schoolmgmt.repository;

import com.schoolmgmt.model.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findByStudentId(Long studentId);
    Optional<Mark> findByStudentIdAndSubjectIdAndTerm(Long studentId, Long subjectId, String term);
}
