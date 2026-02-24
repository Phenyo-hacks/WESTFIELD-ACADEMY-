package com.schoolmgmt.controller;

import com.schoolmgmt.model.Mark;
import com.schoolmgmt.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "*") // Allow all origins for development
public class MarkController {

    @Autowired
    private MarkService markService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public List<Mark> getAllMarks(@RequestParam(required = false) Long studentId) {
        if (studentId != null) {
            return markService.getMarksByStudentId(studentId);
        }
        return markService.getAllMarks();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<Mark> getMarkById(@PathVariable Long id) {
        return markService.getMarkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public Mark createMark(@RequestBody Mark mark) {
        return markService.createMark(mark);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<Mark> updateMark(@PathVariable Long id, @RequestBody Mark markDetails) {
        try {
            Mark updatedMark = markService.updateMark(id, markDetails);
            return ResponseEntity.ok(updatedMark);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<Void> deleteMark(@PathVariable Long id) {
        markService.deleteMark(id);
        return ResponseEntity.noContent().build();
    }
}
