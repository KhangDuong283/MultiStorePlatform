// components/OrderHistory.jsx
import { List, Card, Typography, Tag, Collapse, Button, message, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByUserId } from '../hooks/useGetOrderByUserId';
import { useGetOrderToolByOrderId } from '../hooks/useGetOrderToolByOrderId';
import { useGetToolByToolId } from '../hooks/useGetToolByToolId';

const { Title, Text } = Typography;
const { Option } = Select;

const OrderHistory = () => {
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [orderItemsMap, setOrderItemsMap] = useState({});
    const [loadingOrderItems, setLoadingOrderItems] = useState(true);

    const userId = useSelector(state => state?.account?.user?.id);
    const { orders, isLoading } = useGetOrderByUserId(userId);
    const { getOrderToolByOrderId } = useGetOrderToolByOrderId();
    const { getToolByToolId, isLoadingTool } = useGetToolByToolId();

    // Hàm tính toán tổng tiền cho đơn hàng
    const calculateTotalAmount = (orderItems) => {
        return orderItems.reduce((total, item) => {
            const price = item.tool.discountedPrice || item.tool.price;
            return total + price * item.quantity;
        }, 0);
    };

    // Hàm cập nhật chi tiết đơn hàng thêm thuộc tính của tool
    const fetchOrderItems = async () => {
        const allOrderItems = {};
        for (const order of orders) {
            const orderDetail = await getOrderToolByOrderId(order.orderId);
            const fetchedItems = await Promise.all(
                orderDetail.map(async (item) => {
                    item.tool = await getToolByToolId(item.tool.toolId);
                    return item;
                })
            );
            allOrderItems[order.orderId] = fetchedItems;
        }
        return allOrderItems;
    };

    useEffect(() => {
        const loadOrderItems = async () => {
            if (orders?.length) {
                setLoadingOrderItems(true);
                const allOrderItems = await fetchOrderItems();
                setOrderItemsMap(allOrderItems);
                setLoadingOrderItems(false);
            }
        };
        loadOrderItems();
    }, [orders, getOrderToolByOrderId, getToolByToolId]);

    const handleCancelOrder = (orderId) => {
        message.success(`Đơn hàng ${orderId} đã được hủy thành công.`);
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    const filteredOrders = selectedStatus === 'ALL'
        ? orders
        : orders.filter(order => order.status === selectedStatus);

    return (
        <div className="container mx-auto p-4">
            <Title level={2} className="text-center text-2xl font-bold mb-6">
                Đơn hàng của bạn
                <div className="mb-4">
                    <Select
                        defaultValue="ALL"
                        style={{ width: 150 }}
                        onChange={handleStatusChange}
                    >
                        <Option value="ALL">Tất cả</Option>
                        <Option value="COMPLETED">Đã hoàn thành</Option>
                        <Option value="PENDING">Chờ xác nhận</Option>
                        <Option value="CONFIRMED">Đã xác nhận</Option>
                    </Select>
                </div>
            </Title>

            {isLoading || loadingOrderItems || isLoadingTool ? (
                <div className="flex justify-center items-center">
                    Đang tải dữ liệu...
                </div>
            ) : orders.length === 0 ? ( // Kiểm tra nếu không có đơn hàng
                <div className="flex justify-center items-center">
                    <Text className="text-gray-500">Bạn chưa có đơn hàng nào.</Text>
                </div>
            ) : (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={filteredOrders}
                    renderItem={order => {
                        const orderItems = orderItemsMap[order.orderId] || [];
                        const totalAmount = calculateTotalAmount(orderItems) + order.shippingCost;

                        return (
                            <Card
                                className="order-card shadow-md rounded-lg p-3 mb-4"
                                key={order.orderId}
                                hoverable
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <Title level={5} className="text-lg">
                                        Mã đơn hàng: {order.orderId}
                                        <Text className="block text-gray-400 text-sm">
                                            Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
                                        </Text>
                                    </Title>
                                    <Tag color={getStatusColor(order.status)}>
                                        {order.status}
                                    </Tag>
                                </div>
                                <Text className="block text-gray-700">Phí vận chuyển: {order.shippingCost.toLocaleString()}₫</Text>
                                <Text className="block text-gray-700 font-bold">Tổng tiền: {totalAmount.toLocaleString()}₫</Text>

                                {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                                    <Button
                                        type="primary"
                                        danger
                                        className="mt-2"
                                        onClick={() => handleCancelOrder(order.orderId)}
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                )}

                                <Collapse
                                    defaultActiveKey={[]}
                                    className="mt-2"
                                    items={[
                                        {
                                            key: 'details',
                                            label: "Chi tiết đơn hàng",
                                            children: (
                                                <List
                                                    size="small"
                                                    dataSource={orderItems}
                                                    renderItem={item => (
                                                        <List.Item className="border-b border-gray-200 py-1 flex justify-between items-center">
                                                            <Text className="text-gray-800 flex-1">{item.tool.name}</Text>
                                                            <div className="text-gray-800">
                                                                <Text className="mr-2">(x{item.quantity})</Text>
                                                                <Text>Đơn giá: {(item.tool.discountedPrice || item.tool.price)?.toLocaleString()}₫</Text>
                                                            </div>
                                                        </List.Item>
                                                    )}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </Card>
                        );
                    }}
                />
            )}
        </div>
    );
};

// Helper functions
const getStatusColor = (status) => {
    switch (status) {
        case 'SHIPPED': return 'green';
        case 'PENDING': return 'orange';
        case 'CONFIRMED': return 'blue';
        default: return 'default';
    }
};

export default OrderHistory;
