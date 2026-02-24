package com.schoolmgmt.repository;

import com.schoolmgmt.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiverIdOrderByTimestampDesc(Long receiverId);
    List<Message> findBySenderIdOrderByTimestampDesc(Long senderId);
    List<Message> findByReceiverIdAndReadStatusFalse(Long receiverId);
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(Long user1Id, Long user2Id, Long user3Id, Long user4Id);
}
