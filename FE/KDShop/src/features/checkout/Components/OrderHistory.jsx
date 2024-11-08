import { Typography, message, Empty, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByUserId } from '../hooks/useGetOrderByUserId';
import { useGetOrderToolByOrderId } from '../hooks/useGetOrderToolByOrderId';
import { useGetToolByToolId } from '../hooks/useGetToolByToolId';
import { useUpdateOrder } from '../../seller/hooks/useUpdateOrder';
import OrderDetailSelectStatus from './OrderDetailSelectStatus';
import OrderHistoryList from './OrderHistoryList';

const { Title } = Typography;

const OrderHistory = () => {
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [orderItemsMap, setOrderItemsMap] = useState({});
    const [loadingOrderItems, setLoadingOrderItems] = useState(true);

    const userId = useSelector(state => state?.account?.user?.id);
    const { orders, isLoading } = useGetOrderByUserId(userId);

    const { getToolByToolId, isLoadingTool } = useGetToolByToolId();



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
                <OrderDetailSelectStatus onStatusChange={handleStatusChange} />
            </Title>

            {isLoading || loadingOrderItems || isLoadingTool ? (
                <Spin tip="Đang tải dữ liệu đơn hàng..." >
                    <div style={{ minHeight: '50vh' }} />
                </Spin>
            ) : !Array.isArray(orders) || orders.length === 0 ? (
                <Empty
                    description="Bạn chưa có đơn hàng nào."
                    imageStyle={{
                        height: 60,
                    }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            ) : (
                <OrderHistoryList
                    filteredOrders={filteredOrders}
                    orderItemsMap={orderItemsMap}
                    handleCancelOrder={handleCancelOrder}
                    handleReceiveOrder={handleReceiveOrder}
                    handleReturnRequest={handleReturnRequest}
                />
            )}
        </div>
    );
};


export default OrderHistory;
