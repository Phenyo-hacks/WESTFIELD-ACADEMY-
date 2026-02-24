package com.schoolmgmt.repository;

import com.schoolmgmt.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByTargetAudience(String targetAudience);
    List<Announcement> findByAuthorId(Long authorId);
}
