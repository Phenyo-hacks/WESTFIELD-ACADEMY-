package com.schoolmgmt.controller;

import com.schoolmgmt.model.TimetableEntry;
import com.schoolmgmt.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/timetables")
@CrossOrigin(origins = "*") // Allow all origins for development
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public List<TimetableEntry> getAllTimetableEntries(
            @RequestParam(required = false) Long classId,
            @RequestParam(required = false) Long teacherId,
            @RequestParam(required = false) DayOfWeek day) {
        if (classId != null) {
            return timetableService.getTimetableEntriesByClass(classId);
        } else if (teacherId != null) {
            return timetableService.getTimetableEntriesByTeacher(teacherId);
        } else if (day != null) {
            return timetableService.getTimetableEntriesByDay(day);
        }
        return timetableService.getAllTimetableEntries();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<TimetableEntry> getTimetableEntryById(@PathVariable Long id) {
        return timetableService.getTimetableEntryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TimetableEntry createTimetableEntry(@RequestBody TimetableEntry entry) {
        return timetableService.createTimetableEntry(entry);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TimetableEntry> updateTimetableEntry(@PathVariable Long id, @RequestBody TimetableEntry entryDetails) {
        try {
            TimetableEntry updatedEntry = timetableService.updateTimetableEntry(id, entryDetails);
            return ResponseEntity.ok(updatedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTimetableEntry(@PathVariable Long id) {
        timetableService.deleteTimetableEntry(id);
        return ResponseEntity.noContent().build();
    }
}
