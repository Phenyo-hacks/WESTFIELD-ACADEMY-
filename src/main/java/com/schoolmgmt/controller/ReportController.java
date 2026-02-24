package com.schoolmgmt.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*") // Allow all origins for development
public class ReportController {

    // Placeholder for JasperReports integration
    // In a real implementation, you would inject a ReportService here
    // and use it to generate the actual PDF/CSV bytes.

    @GetMapping("/students/pdf")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> generateStudentsPdfReport() {
        // TODO: Implement actual PDF generation using JasperReports
        // For now, return a dummy PDF or an error
        String dummyContent = "This is a dummy PDF report for students.";
        byte[] pdfBytes = dummyContent.getBytes(); // Replace with actual PDF bytes

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "students_report.pdf");
        headers.setContentLength(pdfBytes.length);

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

    @GetMapping("/attendance/csv")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<byte[]> generateAttendanceCsvReport(
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Long classId) {
        // TODO: Implement actual CSV generation using JasperReports or custom CSV writer
        // For now, return a dummy CSV or an error
        String dummyContent = "studentId,date,status\n1,2025-08-01,Present\n2,2025-08-01,Absent";
        byte[] csvBytes = dummyContent.getBytes(); // Replace with actual CSV bytes

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("filename", "attendance_report.csv");
        headers.setContentLength(csvBytes.length);

        return ResponseEntity.ok()
                .headers(headers)
                .body(csvBytes);
    }

    // Add more reporting endpoints as needed, e.g., for marks, class rosters
}
