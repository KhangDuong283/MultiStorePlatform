package com.dlk.ct466.util.constant;

public enum OrderStatusEnum {
    PENDING,            // Đơn hàng mới được tạo, chờ xử lí
    CONFIRMED,          // Đơn hàng đã được xác nhận
    PROCESSING,         // Đơn hàng đang được chuẩn bị
    SHIPPED,            // Đơn hàng đã được vận chuyển
    DELIVERED,          // Đơn hàng đã được giao
    CANCELLED,          // Đơn hàng đã bị hủy
    RETURN_REQUESTED,   // Khách hàng yêu cầu trả lại hàng
    RETURNED,           // Hàng đã được trả lại thành công.
    REFUNDED,           // Đơn hàng cần hoàn tiền
}
