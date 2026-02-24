package com.schoolmgmt.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String status; // e.g., "Present", "Absent", "Late"

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // Optional: Link to a specific class session if needed, or infer from student's class
    // @ManyToOne
    // @JoinColumn(name = "class_id")
    // private SchoolClass schoolClass;
}
