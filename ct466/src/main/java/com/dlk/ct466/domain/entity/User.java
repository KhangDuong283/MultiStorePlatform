package com.dlk.ct466.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long userId;

    @NotBlank(message = "Full name could not be blank")
    String fullName;

    @NotBlank(message = "Email could not be blank")
    String email;

    @NotBlank(message = "Password could not be blank")
    String password;

    String imageUrl;

    @Column(nullable = false)
    boolean deleted = false;

    @Column(nullable = false)
    boolean isActive = true;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Address> address;
}
