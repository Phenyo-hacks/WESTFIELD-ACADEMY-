package com.schoolmgmt.service;

import com.schoolmgmt.model.Attendance;
import com.schoolmgmt.model.Student;
import com.schoolmgmt.repository.AttendanceRepository;
import com.schoolmgmt.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private StudentRepository studentRepository;

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }

    public Attendance createAttendance(Attendance attendance) {
        Student student = studentRepository.findById(attendance.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found for attendance creation"));
        attendance.setStudent(student);
        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(Long id, Attendance attendanceDetails) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found with id " + id));

        attendance.setDate(attendanceDetails.getDate());
        attendance.setStatus(attendanceDetails.getStatus());

        if (attendanceDetails.getStudent() != null && attendanceDetails.getStudent().getId() != null) {
            Student student = studentRepository.findById(attendanceDetails.getStudent().getId())
                    .orElseThrow(() -> new RuntimeException("Student not found for attendance update"));
            attendance.setStudent(student);
        }

        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    public List<Attendance> getAttendanceByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getAttendanceByDateAndClass(LocalDate date, Long classId) {
        return attendanceRepository.findByDateAndStudentSchoolClassId(date, classId);
    }
}
