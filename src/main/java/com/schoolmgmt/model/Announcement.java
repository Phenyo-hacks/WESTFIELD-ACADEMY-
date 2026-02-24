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
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDate date;
    private String targetAudience; // e.g., "ALL", "STUDENTS", "TEACHERS", "CLASS_10A"

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
}
