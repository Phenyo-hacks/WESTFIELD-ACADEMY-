package com.schoolmgmt.service;

import com.schoolmgmt.model.Message;
import com.schoolmgmt.model.User;
import com.schoolmgmt.repository.MessageRepository;
import com.schoolmgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Message sendMessage(Message message) {
        User sender = userRepository.findById(message.getSender().getId())
                .orElseThrow(() -> new RuntimeException("Sender user not found"));
        User receiver = userRepository.findById(message.getReceiver().getId())
                .orElseThrow(() -> new RuntimeException("Receiver user not found"));

        message.setSender(sender);
        message.setReceiver(receiver);
        message.setTimestamp(LocalDateTime.now());
        message.setReadStatus(false); // New messages are unread by default
        return messageRepository.save(message);
    }

    public Message updateMessage(Long id, Message messageDetails) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found with id " + id));

        message.setContent(messageDetails.getContent());
        message.setReadStatus(messageDetails.isReadStatus());
        // Timestamp should generally not be updated after creation, but can be if needed
        // message.setTimestamp(messageDetails.getTimestamp());

        if (messageDetails.getSender() != null && messageDetails.getSender().getId() != null) {
            User sender = userRepository.findById(messageDetails.getSender().getId())
                    .orElseThrow(() -> new RuntimeException("Sender user not found for message update"));
            message.setSender(sender);
        }
        if (messageDetails.getReceiver() != null && messageDetails.getReceiver().getId() != null) {
            User receiver = userRepository.findById(messageDetails.getReceiver().getId())
                    .orElseThrow(() -> new RuntimeException("Receiver user not found for message update"));
            message.setReceiver(receiver);
        }

        return messageRepository.save(message);
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }

    public List<Message> getInboxMessages(Long userId) {
        return messageRepository.findByReceiverIdOrderByTimestampDesc(userId);
    }

    public List<Message> getSentMessages(Long userId) {
        return messageRepository.findBySenderIdOrderByTimestampDesc(userId);
    }

    public List<Message> getUnreadMessages(Long userId) {
        return messageRepository.findByReceiverIdAndReadStatusFalse(userId);
    }

    public List<Message> getConversation(Long user1Id, Long user2Id) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(user1Id, user2Id, user1Id, user2Id);
    }

    public void markMessageAsRead(Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found with id " + messageId));
        message.setReadStatus(true);
        messageRepository.save(message);
    }
}
