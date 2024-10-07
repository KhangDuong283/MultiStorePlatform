package com.dlk.ct466.domain.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "order_tools")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderTool extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String orderToolId;

    @Column(nullable = false)
    @NotNull(message = "Quantity could not be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Quantity must be greater than 0")
    int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    Order order;

    @ManyToOne
    @JoinColumn(name = "tool_id", nullable = false)
    Tool tool;
}
