package com.dlk.ct466.domain.response.user;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ResUserDTO {
    long userId;
    String fullName;
    String email;
    boolean isActive = true;
    String imageUrl;
    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;
}
