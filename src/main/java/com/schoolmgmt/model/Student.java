package com.schoolmgmt.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String rollNo;
    private String contactNumber;
    private String address;
    private String guardianName;
    private String guardianContact;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Link to User for authentication/profile

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private SchoolClass schoolClass; // Link to SchoolClass
}
