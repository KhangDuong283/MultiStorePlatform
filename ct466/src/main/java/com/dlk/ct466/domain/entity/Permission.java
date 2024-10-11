package com.dlk.ct466.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "permissions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Permission extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long permissionId;

    @NotBlank(message = "Name not be blank")
    String name;

    @NotBlank(message = "Api path not be blank")
    String apiPath;

    @NotBlank(message = "Method not be blank")
    String method;

    @NotBlank(message = "Module not be blank")
    String module;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "permission")
    @JsonIgnore
    List<RolePermission> rolePermissions;

}
