package com.campusconnect.service;

import com.campusconnect.dto.notification.NotificationResponse;
import com.campusconnect.entity.Notification;
import com.campusconnect.entity.User;
import com.campusconnect.entity.enums.NotificationType;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.exception.UnauthorizedException;
import com.campusconnect.repository.NotificationRepository;
import com.campusconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void sendNotification(Long userId, String title, String message, NotificationType type) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type != null ? type : NotificationType.INFO)
                .read(false)
                .build();

        notificationRepository.save(notification);
    }

    @Transactional(readOnly = true)
    public Page<NotificationResponse> getUserNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::mapToNotificationResponse);
    }

    @Transactional(readOnly = true)
    public long countUnread(Long userId) {
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    public void markAllRead(Long userId) {
        notificationRepository.markAllReadByUserId(userId);
    }

    public void markRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with ID: " + notificationId));

        if (!notification.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You do not have permission to modify this notification");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public NotificationResponse mapToNotificationResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType() != null ? notification.getType().name() : null)
                .read(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
