//package com.dlk.ct466.service;
//
//import com.dlk.ct466.domain.entity.Course;
//import com.dlk.ct466.domain.entity.Order;
//import com.dlk.ct466.domain.entity.OrderCourse;
//import com.dlk.ct466.domain.response.ResPaginationDTO; // DTO cho phân trang
//import com.dlk.ct466.repository.OrderCourseRepository; // Repository cho OrderCourse
//import com.dlk.ct466.util.PaginationUtil;
//import com.dlk.ct466.util.error.IdInvalidException;
//import com.turkraft.springfilter.converter.FilterSpecification;
//import com.turkraft.springfilter.converter.FilterSpecificationConverter;
//import com.turkraft.springfilter.parser.FilterParser;
//import com.turkraft.springfilter.parser.node.FilterNode;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class OrderCourseService {
//    private final OrderCourseRepository orderCourseRepository;
//    private final OrderService orderService;
//    private final CourseService courseService; // Dịch vụ quản lý Course
//    private final FilterParser filterParser;
//    private final FilterSpecificationConverter filterSpecificationConverter;
//
//    public OrderCourse getOrderCourseById(String id) throws IdInvalidException {
//        return orderCourseRepository.findById(id).orElseThrow(
//                () -> new IdInvalidException("Order course id: " + id + " not found")
//        );
//    }
//
//    public ResOrderCourseDTO getOrderCourseByIdDTO(String id) throws IdInvalidException {
//        OrderCourse dbOrderCourse = orderCourseRepository.findById(id).orElseThrow(
//                () -> new IdInvalidException("Order course id: " + id + " not found")
//        );
//
//        return OrderCourseMapper.mapToOrderCourseDTO(dbOrderCourse); // Giả sử bạn đã tạo mapper cho OrderCourse
//    }
//
//    public ResCreateOrderCourseDTO createOrderCourse(ReqOrderCourseDTO request) throws IdInvalidException {
//        Order order = orderService.getOrderById(request.getOrder().getOrderId());
//        Course course = courseService.getCourseById(request.getCourse().getCourseId());
//
//        Optional<OrderCourse> existOrderCourse =
//                orderCourseRepository.findByOrderOrderIdAndCourseCourseId(
//                        order.getOrderId(),
//                        course.getCourseId()
//                );
//
//        OrderCourse orderCourse;
//
//        if (existOrderCourse.isPresent()) {
//            // nếu order đã tồn tại course thì tăng số lượng lên
//            orderCourse = existOrderCourse.get();
//            orderCourse.setQuantity(orderCourse.getQuantity() + request.getQuantity());
//        } else {
//            // nếu chưa tồn tại thì tạo mới bình thường
//            orderCourse = new OrderCourse().toBuilder()
//                    .quantity(request.getQuantity())
//                    .course(course)
//                    .order(order)
//                    .build();
//        }
//
//        OrderCourse newOrderCourse = orderCourseRepository.save(orderCourse);
//
//        return OrderCourseMapper.mapToCreateOrderCourseDTO(newOrderCourse); // Giả sử bạn đã tạo mapper cho OrderCourse
//    }
//
//    public ResUpdateOrderCourseDTO updateOrderCourse(ReqOrderCourseDTO request, String id) throws IdInvalidException {
//        OrderCourse dbOrderCourse = getOrderCourseById(id);
//
//        // chắc không ai có thể đổi đc order từ người này sang người kia đâu :)))
//        Order newOrder = orderService.getOrderById(request.getOrder().getOrderId());
//        dbOrderCourse.setOrder(newOrder);
//
//        Course newCourse = courseService.getCourseById(request.getCourse().getCourseId());
//        if (!dbOrderCourse.getCourse().getCourseId().equals(newCourse.getCourseId())) {
//            // Kiểm tra xem CourseId mới đã tồn tại trong OrderCourse với cùng OrderId hay chưa
//            Optional<OrderCourse> existingOrderCourse =
//                    orderCourseRepository.findByOrderOrderIdAndCourseCourseId(
//                            newOrder.getOrderId(),
//                            newCourse.getCourseId()
//                    );
//
//            if (existingOrderCourse.isPresent()) {
//                // Nếu Course đã tồn tại với Order này -> tăng số lượng lên
//                OrderCourse existOrderCourse = existingOrderCourse.get();
//                existOrderCourse.setQuantity(existOrderCourse.getQuantity() + request.getQuantity());
//
//                OrderCourse updatedOrderCourse = orderCourseRepository.save(existOrderCourse);
//                return OrderCourseMapper.mapToUpdateOrderCourseDTO(updatedOrderCourse); // Giả sử bạn đã tạo mapper cho OrderCourse
//            } else {
//                // Nếu không có OrderCourse tồn tại với Course mới, cập nhật Course cho dbOrderCourse hiện tại
//                dbOrderCourse.setCourse(newCourse);
//            }
//        }
//
//        dbOrderCourse.setQuantity(request.getQuantity());
//
//        OrderCourse updatedOrderCourse = orderCourseRepository.save(dbOrderCourse);
//
//        return OrderCourseMapper.mapToUpdateOrderCourseDTO(updatedOrderCourse); // Giả sử bạn đã tạo mapper cho OrderCourse
//    }
//
//    public ResPaginationDTO getAllOrderCourses(Pageable pageable) {
//        Page<OrderCourse> pageOrderCourse = orderCourseRepository.findAll(pageable);
//        return PaginationUtil.getPaginatedResult(pageOrderCourse, pageable, OrderCourseMapper::mapToOrderCourseDTO); // Giả sử bạn đã tạo mapper cho OrderCourse
//    }
//
//    public ResPaginationDTO getOrderCoursesByOrderId(Pageable pageable, String orderId) throws IdInvalidException {
//        orderService.getOrderById(orderId);
//
//        FilterNode node = filterParser.parse("order.id='" + orderId + "'");
//        FilterSpecification<OrderCourse> spec = filterSpecificationConverter.convert(node);
//
//        Page<OrderCourse> pageOrderCourse = orderCourseRepository.findAll(spec, pageable);
//        return PaginationUtil.getPaginatedResult(pageOrderCourse, pageable, OrderCourseMapper::mapToOrderCourseDTO); // Giả sử bạn đã tạo mapper cho OrderCourse
//    }
//
//    public ResPaginationDTO getOrderCoursesByCourseId(Pageable pageable, String courseId) throws IdInvalidException {
//        courseService.getCourseById(courseId);
//
//        FilterNode node = filterParser.parse("course.id='" + courseId + "'");
//        FilterSpecification<OrderCourse> spec = filterSpecificationConverter.convert(node);
//
//        Page<OrderCourse> pageOrderCourse = orderCourseRepository.findAll(spec, pageable);
//        return PaginationUtil.getPaginatedResult(pageOrderCourse, pageable, OrderCourseMapper::mapToOrderCourseDTO); // Giả sử bạn đã tạo mapper cho OrderCourse
//    }
//}
