import { List, Card, Typography, Tag, Collapse, Button, message, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByUserId } from '../hooks/useGetOrderByUserId';
import { useGetOrderToolByOrderId } from '../hooks/useGetOrderToolByOrderId';
import { useGetToolByToolId } from '../hooks/useGetToolByToolId';
import { useNavigate } from 'react-router-dom';
import { useUpdateOrder } from '../../seller/hooks/useUpdateOrder';

const { Title, Text } = Typography;
const { Option } = Select;

const OrderHistory = () => {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [orderItemsMap, setOrderItemsMap] = useState({});
    const [loadingOrderItems, setLoadingOrderItems] = useState(true);

    const userId = useSelector(state => state?.account?.user?.id);
    const { orders, isLoading } = useGetOrderByUserId(userId);
    const { getToolByToolId, isLoadingTool } = useGetToolByToolId();
    console.log(orders)

    // Hàm tính toán tổng tiền cho đơn hàng
    const calculateTotalAmount = (orderItems) => {
        return orderItems.reduce((total, item) => {
            const price = item.tool.discountedPrice || item.tool.price;
            return total + price * item.quantity;
        }, 0);
    };

    const { getOrderToolByOrderId } = useGetOrderToolByOrderId();
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
            if (orders && orders.length) {
                setLoadingOrderItems(true);
                const allOrderItems = await fetchOrderItems();
                setOrderItemsMap(allOrderItems);
                setLoadingOrderItems(false);
            } else {
                setLoadingOrderItems(false);
            }
        };
        loadOrderItems();
    }, [orders, getOrderToolByOrderId, getToolByToolId]);


    const { updateOrder } = useUpdateOrder();

    useEffect(() => {
        if (updateOrder) {
            fetchOrderItems();
        }
    }, [updateOrder]);

    const handleCancelOrder = (orderId, order) => {
        const orderUpdate = {
            status: "CANCELLED",
            shippingCost: order.shippingCost,
            user: {
                userId: order.user.id
            },
            paymentMethod: {
                paymentMethodId: order.paymentMethod.id
            },
            address: {
                addressId: order.address.id
            }
        };
        updateOrder({ orderId, orderUpdate })
        message.success(`Đơn hàng ${orderId} đã được hủy thành công.`);
    };

    const handleReceiveOrder = (orderId, order) => {
        const orderUpdate = {
            status: "SUCCESS",
            shippingCost: order.shippingCost,
            user: {
                userId: order.user.id
            },
            paymentMethod: {
                paymentMethodId: order.paymentMethod.id
            },
            address: {
                addressId: order.address.id
            }
        };
        updateOrder({ orderId, orderUpdate })
        message.success(`Xác nhận đơn hàng ${orderId} đã nhận hàng thành công.`);
    };

    const handleReturnRequest = (orderId, order) => {
        const orderUpdate = {
            status: "RETURN_REQUESTED",
            shippingCost: order.shippingCost,
            user: {
                userId: order.user.id
            },
            paymentMethod: {
                paymentMethodId: order.paymentMethod.id
            },
            address: {
                addressId: order.address.id
            }
        };
        updateOrder({ orderId, orderUpdate })
        message.success(`Xác nhận đơn hàng ${orderId} đã nhận hàng thành công.`);
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
                        style={{ width: 170 }}
                        onChange={handleStatusChange}
                    >
                        <Option value="ALL">Tất cả</Option>
                        <Option value="SUCCESS">Đã hoàn thành</Option>
                        <Option value="PENDING">Chờ xác nhận</Option>
                        <Option value="CONFIRMED">Đã xác nhận</Option>
                        <Option value="SHIPPED">Đang vận chuyển</Option>
                        <Option value="DELIVERED">Đã giao</Option>
                        <Option value="RETURN_REQUESTED">Yêu cầu hoàn trả</Option>
                        <Option value="CANCELLED">Đã hủy</Option>
                        <Option value="RETURN_SUCCEEDED">Hoàn trả thành công</Option>
                        <Option value="RETURN_REFUSED">Hoàn trả bị từ chối</Option>
                    </Select>

                </div>
            </Title>
            {isLoading || loadingOrderItems || isLoadingTool ? (
                <div className="flex justify-center items-center">
                    Đang tải dữ liệu đơn hàng...
                </div>
            ) : !Array.isArray(orders) || orders.length === 0 ? (
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
                        // console.log(order)
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
                                    <Tag className="text-sm" color={getStatusColor(order.status)}>
                                        {getStatusContent(order.status)}
                                    </Tag>
                                </div>
                                <Text className="block text-gray-700">Phí vận chuyển: {order.shippingCost.toLocaleString()}₫</Text>
                                <Text className="block text-gray-700 font-bold">Tổng tiền: {totalAmount.toLocaleString()}₫</Text>

                                {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                                    <Button
                                        type="primary"
                                        danger
                                        className="mt-2"
                                        onClick={() => handleCancelOrder(order.orderId, order)}
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                )}
                                {(order.status === 'DELIVERED') && (
                                    <>
                                        <Button
                                            type="primary"
                                            className="mt-2 bg-green-500 border-none hover:bg-green-600"
                                            onClick={() => handleReceiveOrder(order.orderId, order)}
                                        >
                                            Đã nhận được hàng
                                        </Button>
                                        <Button
                                            type="default"
                                            className="ml-2 mt-2 border-red-500 text-red-500 "
                                            onClick={() => handleReturnRequest(order.orderId, order)}
                                        >
                                            Yêu cầu hoàn trả
                                        </Button>
                                    </>

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
                                                        <List.Item
                                                            className="border-b border-gray-200 py-1 flex justify-between items-center"
                                                            onClick={() => { navigate(`/tool/${item.tool.toolId}`) }}
                                                        >
                                                            <Text className="text-gray-800 flex-1">{item.tool.name}</Text>
                                                            <div className="text-gray-800 w-48">
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

const getStatusColor = (status) => {
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

const getStatusContent = (status) => {
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

export default OrderHistory;
