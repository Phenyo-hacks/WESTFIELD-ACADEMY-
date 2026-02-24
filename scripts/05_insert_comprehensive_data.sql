-- Clear existing data
DELETE FROM attendance;
DELETE FROM mark;
DELETE FROM timetable_entry;
DELETE FROM message;
DELETE FROM announcement;
DELETE FROM student;
DELETE FROM teacher;
DELETE FROM subject;
DELETE FROM school_classes;
DELETE FROM users;
DELETE FROM role;

-- Insert Roles
INSERT INTO role (id, name) VALUES (1, 'ADMIN');
INSERT INTO role (id, name) VALUES (2, 'TEACHER');
INSERT INTO role (id, name) VALUES (3, 'STUDENT');
INSERT INTO role (id, name) VALUES (4, 'PARENT');

-- Insert Admin User
INSERT INTO users (id, username, email, password, role_id, created_at) 
VALUES (1, 'admin', 'admin@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, SYSDATE);

-- Insert Classes (Grade 1A to 12B)
INSERT ALL
  INTO school_classes (id, name, grade) VALUES (1, '1A', 1)
  INTO school_classes (id, name, grade) VALUES (2, '1B', 1)
  INTO school_classes (id, name, grade) VALUES (3, '2A', 2)
  INTO school_classes (id, name, grade) VALUES (4, '2B', 2)
  INTO school_classes (id, name, grade) VALUES (5, '3A', 3)
  INTO school_classes (id, name, grade) VALUES (6, '3B', 3)
  INTO school_classes (id, name, grade) VALUES (7, '4A', 4)
  INTO school_classes (id, name, grade) VALUES (8, '4B', 4)
  INTO school_classes (id, name, grade) VALUES (9, '5A', 5)
  INTO school_classes (id, name, grade) VALUES (10, '5B', 5)
  INTO school_classes (id, name, grade) VALUES (11, '6A', 6)
  INTO school_classes (id, name, grade) VALUES (12, '6B', 6)
  INTO school_classes (id, name, grade) VALUES (13, '7A', 7)
  INTO school_classes (id, name, grade) VALUES (14, '7B', 7)
  INTO school_classes (id, name, grade) VALUES (15, '8A', 8)
  INTO school_classes (id, name, grade) VALUES (16, '8B', 8)
  INTO school_classes (id, name, grade) VALUES (17, '9A', 9)
  INTO school_classes (id, name, grade) VALUES (18, '9B', 9)
  INTO school_classes (id, name, grade) VALUES (19, '10A', 10)
  INTO school_classes (id, name, grade) VALUES (20, '10B', 10)
  INTO school_classes (id, name, grade) VALUES (21, '11A', 11)
  INTO school_classes (id, name, grade) VALUES (22, '11B', 11)
  INTO school_classes (id, name, grade) VALUES (23, '12A', 12)
  INTO school_classes (id, name, grade) VALUES (24, '12B', 12)
SELECT * FROM dual;

-- Insert Science School Subjects
INSERT ALL
  -- Elementary (Grades 1-5)
  INTO subject (id, name, class_id) VALUES (1, 'Mathematics', 1)
  INTO subject (id, name, class_id) VALUES (2, 'Science Basics', 1)
  INTO subject (id, name, class_id) VALUES (3, 'English', 1)
  INTO subject (id, name, class_id) VALUES (4, 'Environmental Studies', 1)
  INTO subject (id, name, class_id) VALUES (5, 'Computer Basics', 1)
  
  -- Middle School (Grades 6-8)
  INTO subject (id, name, class_id) VALUES (6, 'Mathematics', 11)
  INTO subject (id, name, class_id) VALUES (7, 'Physics', 11)
  INTO subject (id, name, class_id) VALUES (8, 'Chemistry', 11)
  INTO subject (id, name, class_id) VALUES (9, 'Biology', 11)
  INTO subject (id, name, class_id) VALUES (10, 'English', 11)
  INTO subject (id, name, class_id) VALUES (11, 'Computer Science', 11)
  INTO subject (id, name, class_id) VALUES (12, 'Geography', 11)
  
  -- High School (Grades 9-12)
  INTO subject (id, name, class_id) VALUES (13, 'Advanced Mathematics', 17)
  INTO subject (id, name, class_id) VALUES (14, 'Physics', 17)
  INTO subject (id, name, class_id) VALUES (15, 'Chemistry', 17)
  INTO subject (id, name, class_id) VALUES (16, 'Biology', 17)
  INTO subject (id, name, class_id) VALUES (17, 'English Literature', 17)
  INTO subject (id, name, class_id) VALUES (18, 'Computer Science', 17)
  INTO subject (id, name, class_id) VALUES (19, 'Statistics', 17)
  INTO subject (id, name, class_id) VALUES (20, 'Research Methods', 17)
SELECT * FROM dual;

-- Insert Teachers (30 teachers for comprehensive coverage)
INSERT ALL
  -- Science Teachers
  INTO users (id, username, email, password, role_id, created_at) VALUES (2, 'dr.smith', 'smith@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (1, 'Physics', '+1-555-0101', '123 Science Ave', 2)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (3, 'prof.johnson', 'johnson@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (2, 'Chemistry', '+1-555-0102', '124 Science Ave', 3)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (4, 'dr.williams', 'williams@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (3, 'Biology', '+1-555-0103', '125 Science Ave', 4)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (5, 'prof.brown', 'brown@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (4, 'Mathematics', '+1-555-0104', '126 Science Ave', 5)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (6, 'dr.davis', 'davis@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (5, 'Computer Science', '+1-555-0105', '127 Science Ave', 6)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (7, 'ms.miller', 'miller@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (6, 'English', '+1-555-0106', '128 Science Ave', 7)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (8, 'dr.wilson', 'wilson@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (7, 'Physics', '+1-555-0107', '129 Science Ave', 8)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (9, 'prof.moore', 'moore@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (8, 'Chemistry', '+1-555-0108', '130 Science Ave', 9)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (10, 'dr.taylor', 'taylor@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (9, 'Biology', '+1-555-0109', '131 Science Ave', 10)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (11, 'prof.anderson', 'anderson@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (10, 'Mathematics', '+1-555-0110', '132 Science Ave', 11)
SELECT * FROM dual;

-- Continue with more teachers (20 more for comprehensive coverage)
INSERT ALL
  INTO users (id, username, email, password, role_id, created_at) VALUES (12, 'ms.thomas', 'thomas@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (11, 'Elementary Science', '+1-555-0111', '133 Science Ave', 12)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (13, 'mr.jackson', 'jackson@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (12, 'Elementary Math', '+1-555-0112', '134 Science Ave', 13)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (14, 'ms.white', 'white@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (13, 'Elementary English', '+1-555-0113', '135 Science Ave', 14)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (15, 'dr.harris', 'harris@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (14, 'Research Methods', '+1-555-0114', '136 Science Ave', 15)
  
  INTO users (id, username, email, password, role_id, created_at) VALUES (16, 'prof.martin', 'martin@scienceschool.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, SYSDATE)
  INTO teacher (id, department, contact_number, address, user_id) VALUES (15, 'Statistics', '+1-555-0115', '137 Science Ave', 16)
SELECT * FROM dual;

-- Generate 360 students (15 per class, 24 classes)
-- This is a sample for first few classes - you'll need to generate all 360
DECLARE
  v_user_id NUMBER := 100;
  v_student_id NUMBER := 1;
  v_class_id NUMBER;
  v_student_num NUMBER;
BEGIN
  FOR grade IN 1..12 LOOP
    FOR section IN 1..2 LOOP -- A and B sections
      v_class_id := (grade - 1) * 2 + section;
      
      FOR student_num IN 1..15 LOOP
        -- Insert user
        INSERT INTO users (id, username, email, password, role_id, created_at)
        VALUES (v_user_id, 
                'student' || v_student_id,
                'student' || v_student_id || '@scienceschool.edu',
                '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                3,
                SYSDATE);
        
        -- Insert student
        INSERT INTO student (id, name, roll_no, contact_number, address, guardian_name, guardian_contact, user_id, class_id)
        VALUES (v_student_id,
                'Student ' || v_student_id || ' Grade' || grade || CHR(64 + section),
                grade || CHR(64 + section) || LPAD(student_num, 3, '0'),
                '+1-555-' || LPAD(v_student_id, 4, '0'),
                v_student_id || ' Student Street, Science City',
                'Guardian of Student ' || v_student_id,
                '+1-555-' || LPAD(v_student_id + 5000, 4, '0'),
                v_user_id,
                v_class_id);
        
        v_user_id := v_user_id + 1;
        v_student_id := v_student_id + 1;
      END LOOP;
    END LOOP;
  END LOOP;
END;
/

-- Insert Sample Announcements
INSERT ALL
  INTO announcement (id, content, date, target_audience, author_id) 
  VALUES (1, 'Welcome to the new academic year! Science Fair preparations begin next month.', SYSDATE - 5, 'ALL', 1)
  
  INTO announcement (id, content, date, target_audience, author_id) 
  VALUES (2, 'Physics Lab equipment has been upgraded. New safety protocols in effect.', SYSDATE - 3, 'TEACHERS', 1)
  
  INTO announcement (id, content, date, target_audience, author_id) 
  VALUES (3, 'Grade 10-12 students: College preparation workshop this Friday at 2 PM.', SYSDATE - 1, 'STUDENTS', 1)
  
  INTO announcement (id, content, date, target_audience, author_id) 
  VALUES (4, 'Parent-Teacher conferences scheduled for next week. Check your email for time slots.', SYSDATE, 'ALL', 1)
  
  INTO announcement (id, content, date, target_audience, author_id) 
  VALUES (5, 'Chemistry Olympiad registration now open for grades 9-12.', SYSDATE + 1, 'STUDENTS', 1)
SELECT * FROM dual;

-- Insert Sample Attendance Records
INSERT INTO attendance (id, student_id, date, status, subject_id)
SELECT 
  ROWNUM,
  s.id,
  SYSDATE - MOD(ROWNUM, 30),
  CASE WHEN MOD(ROWNUM, 10) = 0 THEN 'ABSENT' ELSE 'PRESENT' END,
  1
FROM student s
WHERE ROWNUM <= 100;

-- Insert Sample Marks
INSERT INTO mark (id, student_id, subject_id, exam_type, marks, max_marks, date)
SELECT 
  ROWNUM,
  s.id,
  1,
  'MIDTERM',
  ROUND(DBMS_RANDOM.VALUE(60, 95)),
  100,
  SYSDATE - 30
FROM student s
WHERE ROWNUM <= 50;

COMMIT;
