package com.dlk.ct466.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "payment_method")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentMethod extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long paymentMethodId;

    @Column(nullable = false)
    @NotBlank(message = "Payment method name could not be blank")
    String name;

    @Column(nullable = false)
    boolean isActive = true;

    @Column(nullable = false)
    boolean deleted = false;
}
