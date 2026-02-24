package com.schoolmgmt.repository;

import com.schoolmgmt.model.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<TimetableEntry, Long> {
    List<TimetableEntry> findBySchoolClassId(Long classId);
    List<TimetableEntry> findByTeacherId(Long teacherId);
    List<TimetableEntry> findByDay(DayOfWeek day);
}
