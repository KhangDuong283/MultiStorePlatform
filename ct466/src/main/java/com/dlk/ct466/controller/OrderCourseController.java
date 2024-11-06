//package com.dlk.ct466.controller;
//
//import com.dlk.ct466.domain.response.ResPaginationDTO;
//import com.dlk.ct466.service.OrderCourseService;
//import com.dlk.ct466.util.annotation.ApiMessage;
//import com.dlk.ct466.util.error.IdInvalidException;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/ordercourses")
//public class OrderCourseController {
//    private final OrderCourseService orderCourseService;
//
//    @GetMapping("/{id}")
//    @ApiMessage("Get order course by id")
//    public ResponseEntity<ResOrderCourseDTO> getById(@PathVariable("id") String id) throws IdInvalidException {
//        return ResponseEntity.ok(orderCourseService.getOrderCourseById(id));
//    }
//
//    @PostMapping
//    @ApiMessage("Create an order course")
//    public ResponseEntity<ResCreateOrderCourseDTO> create(@Valid @RequestBody ReqOrderCourseDTO orderCourse) throws IdInvalidException {
//        return ResponseEntity.status(HttpStatus.CREATED).body(orderCourseService.createOrderCourse(orderCourse));
//    }
//
//    @PutMapping("/{orderCourseId}")
//    @ApiMessage("Update an order course")
//    public ResponseEntity<ResUpdateOrderCourseDTO> update(@PathVariable("orderCourseId") String id, @Valid @RequestBody ReqOrderCourseDTO orderCourse) throws IdInvalidException {
//        return ResponseEntity.ok(orderCourseService.updateOrderCourse(orderCourse, id));
//    }
//
//    @GetMapping
//    @ApiMessage("Get all order courses")
//    public ResponseEntity<ResPaginationDTO> getAllOrderCourses(Pageable pageable) {
//        return ResponseEntity.ok(orderCourseService.getAllOrderCourses(pageable));
//    }
//
//    @GetMapping("/order/{orderId}")
//    @ApiMessage("Get order courses by order ID")
//    public ResponseEntity<ResPaginationDTO> getOrderCoursesByOrderId(Pageable pageable, @PathVariable("orderId") String orderId) throws IdInvalidException {
//        return ResponseEntity.ok(orderCourseService.getOrderCoursesByOrderId(pageable, orderId));
//    }
//
//    @GetMapping("/course/{courseId}")
//    @ApiMessage("Get order courses by course ID")
//    public ResponseEntity<ResPaginationDTO> getOrderCoursesByCourseId(Pageable pageable, @PathVariable("courseId") String courseId) throws IdInvalidException {
//        return ResponseEntity.ok(orderCourseService.getOrderCoursesByCourseId(pageable, courseId));
//    }
//}
