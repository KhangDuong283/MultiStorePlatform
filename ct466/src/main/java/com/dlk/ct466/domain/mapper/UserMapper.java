package com.dlk.ct466.domain.mapper;

import com.dlk.ct466.domain.entity.Role;
import com.dlk.ct466.domain.entity.User;
import com.dlk.ct466.domain.response.user.ResCreateUserDTO;
import com.dlk.ct466.domain.response.user.ResUpdateUserDTO;
import com.dlk.ct466.domain.response.user.ResUserDTO;
import com.dlk.ct466.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static ResCreateUserDTO mapToCreateUserDTO(User user) {
        return ResCreateUserDTO.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .isActive(user.isActive())
                .imageUrl(user.getImageUrl())
                .createdAt(user.getCreatedAt())
                .createdBy(user.getCreatedBy())
                .build();
    }

    public static ResUpdateUserDTO mapToUpdateUserDTO(User user) {
        return ResUpdateUserDTO.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .isActive(user.isActive())
                .imageUrl(user.getImageUrl())
                .updatedAt(user.getUpdatedAt())
                .updatedBy(user.getUpdatedBy())
                .build();
    }

    public static ResUserDTO mapToUserDTO(User user) {
        ResUserDTO.UserRole userRole = new ResUserDTO.UserRole().toBuilder()
                .roleId(user.getRole().getRoleId())
                .name(user.getRole().getName())
                .build();
        return ResUserDTO.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .isActive(user.isActive())
                .imageUrl(user.getImageUrl())
                .createdAt(user.getCreatedAt())
                .createdBy(user.getCreatedBy())
                .updatedAt(user.getUpdatedAt())
                .updatedBy(user.getUpdatedBy())
                .role(userRole)
                .build();
    }
}
