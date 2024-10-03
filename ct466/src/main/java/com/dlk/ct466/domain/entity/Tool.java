package com.dlk.ct466.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;

@Entity
@Table(name = "tool")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@SQLDelete(sql = "UPDATE tool SET deleted = true WHERE tool_id = ?")
public class Tool extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long toolId;

    @Column(nullable = false)
    @NotBlank(message = "Tool type name could not be blank")
    String name;

    @Column(columnDefinition = "MEDIUMTEXT")
    String description;

    @DecimalMin(value = "0.0", inclusive = false, message = "Discounted price must be greater than 0")
    BigDecimal discountedPrice;

    int stockQuantity;
    String imageUrl;

    @Column(nullable = false)
    @NotNull(message = "Tool price could not be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "tool_type_id", nullable = false)
    ToolType toolType;

    @Column(nullable = false)
    boolean deleted = false;

    @Column(nullable = false)
    boolean isActive = true;
}
