package com.dlk.ct466.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "cart_courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartCourse extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long cartCourseId;

    @Column(nullable = false)
    @NotNull(message = "Quantity could not be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    Cart cart;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    Course course;
}
