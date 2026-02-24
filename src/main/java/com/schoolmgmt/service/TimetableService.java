package com.schoolmgmt.service;

import com.schoolmgmt.model.TimetableEntry;
import com.schoolmgmt.model.SchoolClass;
import com.schoolmgmt.model.Subject;
import com.schoolmgmt.model.Teacher;
import com.schoolmgmt.repository.TimetableRepository;
import com.schoolmgmt.repository.ClassRepository;
import com.schoolmgmt.repository.SubjectRepository;
import com.schoolmgmt.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.DayOfWeek;  

@Service
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private TeacherRepository teacherRepository;

    public List<TimetableEntry> getAllTimetableEntries() {
        return timetableRepository.findAll();
    }

    public Optional<TimetableEntry> getTimetableEntryById(Long id) {
        return timetableRepository.findById(id);
    }

    public TimetableEntry createTimetableEntry(TimetableEntry entry) {
        SchoolClass schoolClass = classRepository.findById(entry.getSchoolClass().getId())
                .orElseThrow(() -> new RuntimeException("Class not found for timetable entry creation"));
        Subject subject = subjectRepository.findById(entry.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found for timetable entry creation"));
        Teacher teacher = teacherRepository.findById(entry.getTeacher().getId())
                .orElseThrow(() -> new RuntimeException("Teacher not found for timetable entry creation"));

        entry.setSchoolClass(schoolClass);
        entry.setSubject(subject);
        entry.setTeacher(teacher);
        return timetableRepository.save(entry);
    }

    public TimetableEntry updateTimetableEntry(Long id, TimetableEntry entryDetails) {
        TimetableEntry entry = timetableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable entry not found with id " + id));

        entry.setDay(entryDetails.getDay());
        entry.setTime(entryDetails.getTime());

        if (entryDetails.getSchoolClass() != null && entryDetails.getSchoolClass().getId() != null) {
            SchoolClass schoolClass = classRepository.findById(entryDetails.getSchoolClass().getId())
                    .orElseThrow(() -> new RuntimeException("Class not found for timetable entry update"));
            entry.setSchoolClass(schoolClass);
        }
        if (entryDetails.getSubject() != null && entryDetails.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(entryDetails.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found for timetable entry update"));
            entry.setSubject(subject);
        }
        if (entryDetails.getTeacher() != null && entryDetails.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(entryDetails.getTeacher().getId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found for timetable entry update"));
            entry.setTeacher(teacher);
        }

        return timetableRepository.save(entry);
    }

    public void deleteTimetableEntry(Long id) {
        timetableRepository.deleteById(id);
    }

    public List<TimetableEntry> getTimetableEntriesByClass(Long classId) {
        return timetableRepository.findBySchoolClassId(classId);
    }

    public List<TimetableEntry> getTimetableEntriesByTeacher(Long teacherId) {
        return timetableRepository.findByTeacherId(teacherId);
    }

    public List<TimetableEntry> getTimetableEntriesByDay(DayOfWeek day) {
        return timetableRepository.findByDay(day);
    }
}
