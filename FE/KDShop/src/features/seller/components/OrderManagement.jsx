import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllToolByUserId } from "../hooks/useGetAllToolByUserId";
import { useUniqueOrderIds } from "../hooks/useUniqueOrderIds";
import { useGetOrderToolByOrderId } from "../../checkout/hooks/useGetOrderToolByOrderId";
import { Button } from "antd";
import CardContainer from "../../../components/CardContainer";
const OrderManagement = () => {
    const userId = useSelector(state => state?.account?.user?.id);
    // lấy ra các sản phẩm của chủ shop
    const { tools } = useGetAllToolByUserId(userId);

    // lấy ra orderId đã mua sản phẩm của chủ shop
    const uniqueOrderIds = useUniqueOrderIds(tools);

    // hàm lấy ra các sản phẩm của 1 order 
    const { getOrderToolByOrderId } = useGetOrderToolByOrderId();

    const [ordersWithTools, setOrdersWithTools] = useState({});
    console.log(Object.entries(ordersWithTools));
    useEffect(() => {
        const fetchOrderTools = async () => {
            const result = {};

            for (const orderId of uniqueOrderIds) {
                // lấy ra các sản phẩm của order
                const orderTools = await getOrderToolByOrderId(orderId);


                // Lọc các sản phảm có trong danh sách sản phẩm của chủ shop
                const filteredTools = orderTools?.filter(orderTool =>
                    tools.some(tool => tool.toolId === orderTool.tool.toolId)
                );


                // Thêm danh sách tool vào đối tượng theo từng orderId
                if (filteredTools?.length > 0) {
                    result[orderId] = filteredTools;
                }
            }

            setOrdersWithTools(result);
        };

        if (uniqueOrderIds.length > 0 && tools.length > 0) {
            fetchOrderTools();
        }
    }, [uniqueOrderIds, tools, getOrderToolByOrderId]);

    // Hàm duyệt đơn hàng (tạm thời chỉ là placeholder)
    const handleApproveOrder = (orderId, orderStatus) => {
        console.log(`Duyệt đơn hàng với ID: ${orderId}`);
        // Thực hiện hành động duyệt đơn hàng ở đây (ví dụ: gọi API để cập nhật trạng thái đơn hàng)
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 text-center">Quản lý đơn hàng</h1>

            {Object.entries(ordersWithTools).map(([orderId, orderTools]) => {
                const totalAmount = orderTools.reduce((total, orderTool) => {
                    const price = orderTool.tool.discountedPrice || orderTool.tool.price;
                    return total + orderTool.quantity * price;
                }, 0);

                const orderStatus = orderTools[0].order.status;

                return (
                    <div key={orderId} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-semibold">Đơn hàng: {orderId}</h2>
                        <p><strong>Người mua:</strong> {orderTools[0].order.user.fullName}</p>
                        <p><strong>Ngày tạo:</strong> {new Date(orderTools[0].createdAt).toLocaleString()}</p>
                        <p className="font-semibold">
                            Tổng tiền đơn hàng: <span className="text-red-500">{totalAmount.toLocaleString()}đ</span>
                        </p>
                        <div className="space-y-4 mt-2">
                            {orderTools.map(orderTool => (
                                <div key={orderTool.orderToolId} className="p-4 border rounded-md shadow">
                                    <p><strong>Tên sản phẩm:</strong> {orderTool.tool.name}</p>
                                    <p>
                                        <strong>Giá:</strong>
                                        {(orderTool.tool.discountedPrice || orderTool.tool.price).toLocaleString()}đ
                                        (x{orderTool.quantity})
                                    </p>
                                    <p><strong>Tổng tiền:</strong> {(orderTool.quantity * (orderTool.tool.discountedPrice || orderTool.tool.price)).toLocaleString()}đ</p>
                                </div>
                            ))}
                        </div>


                        <Button
                            type="primary"
                            className="mt-4"
                            onClick={() => handleApproveOrder(orderId, orderStatus)}
                        >
                            {
                                orderStatus === "PENDING" ? "Duyệt đơn hàng" :
                                    (
                                        orderStatus === "CONFIRMED" ? "Dã giao cho Shipper" : // sau khi duyệt xong sẽ có trạng thái CONFIRMED, người bán sẽ cần phải chuẩn bị hàng 
                                            (
                                                orderStatus === "SHIPPED" ? "Đang giao hàng" : "Giao hàng thành công"
                                            )
                                    )
                            }
                        </Button>
                    </div>
                )
            }
            )}
        </div >
    );
}

export default OrderManagement;
