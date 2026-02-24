package com.schoolmgmt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
public class DatabaseTestService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> testDatabaseConnection() {
        Map<String, Object> result = new HashMap<>();
        
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            
            result.put("connected", true);
            result.put("databaseProductName", metaData.getDatabaseProductName());
            result.put("databaseProductVersion", metaData.getDatabaseProductVersion());
            result.put("driverName", metaData.getDriverName());
            result.put("driverVersion", metaData.getDriverVersion());
            result.put("url", metaData.getURL());
            result.put("username", metaData.getUserName());
            
            // Test a simple query
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM USERS", Integer.class);
            result.put("userCount", count);
            
        } catch (SQLException e) {
            result.put("connected", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }

    public Map<String, Object> getDatabaseStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            stats.put("totalUsers", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM USERS", Integer.class));
            stats.put("totalStudents", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM STUDENTS", Integer.class));
            stats.put("totalTeachers", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM TEACHERS", Integer.class));
            stats.put("totalClasses", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM CLASSES", Integer.class));
            stats.put("totalSubjects", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM SUBJECTS", Integer.class));
            stats.put("totalAnnouncements", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ANNOUNCEMENTS", Integer.class));
        } catch (Exception e) {
            stats.put("error", e.getMessage());
        }
        
        return stats;
    }
}
