package com.dlk.ct466.domain.response.address;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResUpdateAddressDTO {
    String addressId;
    String street;
    String ward;
    String district;
    String city;
    Instant createdAt;
    String createdBy;
    Instant updatedAt;
    String updatedBy;
    AddressUser user;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class AddressUser {
        String userId;
        String email;
        String fullName;
    }
}
