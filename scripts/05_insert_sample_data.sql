-- Insert sample data for School Management System

-- Insert Roles
INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('TEACHER');
INSERT INTO roles (name) VALUES ('STUDENT');
INSERT INTO roles (name) VALUES ('PARENT');

-- Insert Users
INSERT INTO users (username, password, email, first_name, last_name, role_id, created_at) VALUES 
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 'admin@school.com', 'System', 'Administrator', 1, CURRENT_TIMESTAMP);

INSERT INTO users (username, password, email, first_name, last_name, role_id, created_at) VALUES 
('teacher1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 'teacher1@school.com', 'Sarah', 'Johnson', 2, CURRENT_TIMESTAMP);

INSERT INTO users (username, password, email, first_name, last_name, role_id, created_at) VALUES 
('teacher2', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 'teacher2@school.com', 'Michael', 'Smith', 2, CURRENT_TIMESTAMP);

INSERT INTO users (username, password, email, first_name, last_name, role_id, created_at) VALUES 
('student1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 'student1@school.com', 'John', 'Doe', 3, CURRENT_TIMESTAMP);

INSERT INTO users (username, password, email, first_name, last_name, role_id, created_at) VALUES 
('student2', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 'student2@school.com', 'Jane', 'Smith', 3, CURRENT_TIMESTAMP);

INSERT INTO users (username, password, email, first_name, last_name, role_id, created_at) VALUES 
('parent1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 'parent1@school.com', 'Robert', 'Doe', 4, CURRENT_TIMESTAMP);

-- Insert Teachers
INSERT INTO teachers (user_id, employee_id, department, qualification, hire_date) VALUES 
(2, 'T001', 'Mathematics', 'M.Sc Mathematics', DATE '2020-01-15');

INSERT INTO teachers (user_id, employee_id, department, qualification, hire_date) VALUES 
(3, 'T002', 'Science', 'M.Sc Physics', DATE '2019-08-20');

-- Insert Classes
INSERT INTO classes (name, grade_level, section, academic_year, class_teacher_id) VALUES 
('Grade 10A', 10, 'A', '2024-2025', 1);

INSERT INTO classes (name, grade_level, section, academic_year, class_teacher_id) VALUES 
('Grade 10B', 10, 'B', '2024-2025', 2);

-- Insert Students
INSERT INTO students (user_id, student_id, date_of_birth, address, phone, parent_contact, class_id, admission_date) VALUES 
(4, 'S001', DATE '2008-05-15', '123 Main St, Cape Town', '021-123-4567', '021-987-6543', 1, DATE '2024-01-10');

INSERT INTO students (user_id, student_id, date_of_birth, address, phone, parent_contact, class_id, admission_date) VALUES 
(5, 'S002', DATE '2008-08-22', '456 Oak Ave, Johannesburg', '011-234-5678', '011-876-5432', 2, DATE '2024-01-10');

-- Insert Subjects
INSERT INTO subjects (name, code, description, credits) VALUES 
('Mathematics', 'MATH10', 'Grade 10 Mathematics', 4);

INSERT INTO subjects (name, code, description, credits) VALUES 
('Physics', 'PHYS10', 'Grade 10 Physics', 4);

INSERT INTO subjects (name, code, description, credits) VALUES 
('English', 'ENG10', 'Grade 10 English', 3);

INSERT INTO subjects (name, code, description, credits) VALUES 
('History', 'HIST10', 'Grade 10 History', 3);

-- Insert Announcements
INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Welcome to the new academic year 2024-2025! We are excited to have all students back. Please ensure you have collected your new textbooks from the library.', DATE '2024-01-08', 'ALL', 1);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Mid-term examinations will be held from March 15-22, 2024. Please check the detailed timetable on the notice board. Students must arrive 30 minutes before each exam.', DATE '2024-03-01', 'STUDENTS', 1);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Parent-Teacher meetings are scheduled for February 10, 2024, from 9:00 AM to 4:00 PM. Please book your slots through the school portal or contact the office.', DATE '2024-02-01', 'PARENTS', 1);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Staff meeting will be held on Friday, January 26, 2024, at 3:30 PM in the conference room. Attendance is mandatory for all teaching staff.', DATE '2024-01-24', 'TEACHERS', 1);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Annual Sports Day will be celebrated on April 15, 2024. Students interested in participating should register with their respective PE teachers by March 30, 2024.', DATE '2024-01-20', 'ALL', 2);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Science Fair 2024 will be held on May 5, 2024. Grade 10 students must submit their project proposals by April 1, 2024. Contact Ms. Johnson for more details.', DATE '2024-01-25', 'STUDENTS', 3);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Library will remain closed for maintenance from February 5-7, 2024. Students can access digital resources through the school portal during this period.', DATE '2024-02-02', 'ALL', 1);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Grade 10A students: Mathematics extra classes will be conducted every Tuesday and Thursday from 3:30-4:30 PM starting February 1, 2024.', DATE '2024-01-28', 'CLASS_10A', 2);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('School uniform policy reminder: All students must wear complete school uniform. Sports shoes are only allowed during PE classes and sports activities.', DATE '2024-01-15', 'STUDENTS', 1);

INSERT INTO announcement (content, date, target_audience, author_id) VALUES 
('Cultural Festival 2024 preparations begin next week. Students interested in participating in dance, music, or drama should contact their class teachers.', DATE '2024-01-30', 'ALL', 1);

-- Insert Sample Attendance Records
INSERT INTO attendance (student_id, date, status, remarks) VALUES 
(1, DATE '2024-01-15', 'PRESENT', NULL);

INSERT INTO attendance (student_id, date, status, remarks) VALUES 
(2, DATE '2024-01-15', 'PRESENT', NULL);

INSERT INTO attendance (student_id, date, status, remarks) VALUES 
(1, DATE '2024-01-16', 'ABSENT', 'Sick leave');

-- Insert Sample Marks
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date) VALUES 
(1, 1, 'UNIT_TEST', 85, 100, DATE '2024-01-20');

INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date) VALUES 
(1, 2, 'UNIT_TEST', 78, 100, DATE '2024-01-22');

INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date) VALUES 
(2, 1, 'UNIT_TEST', 92, 100, DATE '2024-01-20');

-- Insert Sample Timetable Entries
INSERT INTO timetable_entry (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room_number) VALUES 
(1, 1, 1, 'MONDAY', '09:00', '10:00', 'Room 101');

INSERT INTO timetable_entry (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room_number) VALUES 
(1, 2, 2, 'MONDAY', '10:00', '11:00', 'Lab 201');

INSERT INTO timetable_entry (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room_number) VALUES 
(2, 1, 1, 'TUESDAY', '09:00', '10:00', 'Room 102');

COMMIT;
