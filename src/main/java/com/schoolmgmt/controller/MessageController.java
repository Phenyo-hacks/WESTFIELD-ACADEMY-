package com.schoolmgmt.controller;

import com.schoolmgmt.model.Message;
import com.schoolmgmt.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*") // Allow all origins for development
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN')") // Only admin can view all messages
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')") // Users can view their own messages
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        return messageService.getMessageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/inbox")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public List<Message> getInboxMessages(Authentication authentication) {
        // In a real app, you'd get the current user's ID from authentication.
        // For now, assuming a way to get current user ID.
        // Example: Long currentUserId = ((User) authentication.getPrincipal()).getId();
        // Placeholder:
        Long currentUserId = 1L; // Replace with actual user ID from authentication
        return messageService.getInboxMessages(currentUserId);
    }

    @GetMapping("/sent")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public List<Message> getSentMessages(Authentication authentication) {
        Long currentUserId = 1L; // Replace with actual user ID from authentication
        return messageService.getSentMessages(currentUserId);
    }

    @GetMapping("/unread")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public List<Message> getUnreadMessages(Authentication authentication) {
        Long currentUserId = 1L; // Replace with actual user ID from authentication
        return messageService.getUnreadMessages(currentUserId);
    }

    @GetMapping("/conversation/{otherUserId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public List<Message> getConversation(@PathVariable Long otherUserId, Authentication authentication) {
        Long currentUserId = 1L; // Replace with actual user ID from authentication
        return messageService.getConversation(currentUserId, otherUserId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public Message sendMessage(@RequestBody Message message) {
        return messageService.sendMessage(message);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')") // Allow sender/receiver to update (e.g., mark as read)
    public ResponseEntity<Message> updateMessage(@PathVariable Long id, @RequestBody Message messageDetails) {
        try {
            Message updatedMessage = messageService.updateMessage(id, messageDetails);
            return ResponseEntity.ok(updatedMessage);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable Long id) {
        try {
            messageService.markMessageAsRead(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')") // Only admin/teacher can delete messages
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
