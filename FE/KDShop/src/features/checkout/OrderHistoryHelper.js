
export const getStatusColor = (status) => {
    switch (status) {
        case 'SHIPPED': return 'blue';
        case 'PENDING': return 'orange';
        case 'CONFIRMED': return 'purple';
        case 'DELIVERED': return 'green';
        case 'RETURN_REQUESTED': return 'yellow';
        case 'CANCELLED': return 'gray';
        case 'SUCCESS': return 'green'
        case 'RETURN_SUCCEEDED': return 'green';
        case 'RETURN_REFUSED': return 'red';
        default: return 'default';
    }
};

export const getStatusContent = (status) => {
    switch (status) {
        case 'PENDING': return "Chờ xác nhận";
        case 'SHIPPED': return 'Đơn hàng đang được vận chuyển';
        case 'CONFIRMED': return 'Đơn hàng đang được chuẩn bị';
        case 'DELIVERED': return 'Đơn hàng đã được giao đến bạn';
        case 'RETURN_REQUESTED': return 'Bạn đã yêu cầu trả hàng';
        case 'CANCELLED': return 'Bạn đã hủy đơn hàng';
        case 'SUCCESS': return 'Đơn hàng giao thành công'
        case 'RETURN_SUCCEEDED': return 'Người bán đã chấp nhận yêu cầu trả hàng, hãy chuẩn bị gửi trả';
        case 'RETURN_REFUSED': return 'Người bán đã từ chối yêu cầu trả hàng';
        default: return 'default';
    }
};

// Hàm tính toán tổng tiền cho đơn hàng
export const calculateTotalAmount = (orderItems) => {
    return orderItems.reduce((total, item) => {
        const price = item.tool.discountedPrice || item.tool.price;
        return total + price * item.quantity;
    }, 0);
};