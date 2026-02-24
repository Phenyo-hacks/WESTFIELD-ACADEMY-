package com.schoolmgmt.service;

import com.schoolmgmt.model.Announcement;
import com.schoolmgmt.model.User;
import com.schoolmgmt.repository.AnnouncementRepository;
import com.schoolmgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Optional<Announcement> getAnnouncementById(Long id) {
        return announcementRepository.findById(id);
    }

    public Announcement createAnnouncement(Announcement announcement) {
        User author = userRepository.findById(announcement.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("Author user not found for announcement creation"));
        announcement.setAuthor(author);
        return announcementRepository.save(announcement);
    }

    public Announcement updateAnnouncement(Long id, Announcement announcementDetails) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id " + id));

        announcement.setContent(announcementDetails.getContent());
        announcement.setDate(announcementDetails.getDate());
        announcement.setTargetAudience(announcementDetails.getTargetAudience());

        if (announcementDetails.getAuthor() != null && announcementDetails.getAuthor().getId() != null) {
            User author = userRepository.findById(announcementDetails.getAuthor().getId())
                    .orElseThrow(() -> new RuntimeException("Author user not found for announcement update"));
            announcement.setAuthor(author);
        }

        return announcementRepository.save(announcement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }

    public List<Announcement> getAnnouncementsByTargetAudience(String targetAudience) {
        return announcementRepository.findByTargetAudience(targetAudience);
    }

    public List<Announcement> getAnnouncementsByAuthor(Long authorId) {
        return announcementRepository.findByAuthorId(authorId);
    }
}
