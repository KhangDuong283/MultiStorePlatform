import { Button, Card, List } from 'antd';
import OrderDetailContent from './OrderDetailContent';
import OrderDetailCollapse from './OrderDetailCollapse';
import { calculateTotalAmount } from '../OrderHistoryHelper';

const OrderHistoryList = ({ filteredOrders, orderItemsMap, handleCancelOrder, handleReceiveOrder, handleReturnRequest }) => {
    return (
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
                        <OrderDetailContent order={order} totalAmount={totalAmount} />

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

                        <OrderDetailCollapse orderItems={orderItems} />
                    </Card>
                );
            }}
        />)
}

export default OrderHistoryList