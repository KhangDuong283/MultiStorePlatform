import axios from "./axios-customize"

export const callCreateOrder = async (order) => {
    const path = `/api/v1/orders`;
    const res = await axios.post(path, order);
    return res?.data;
}

export const callGetOrdersByUserId = async (userId) => {
    const path = `/api/v1/orders/user-order/${userId}`;
    const res = await axios.get(path);
    return res?.data;
}

export const callUpdateOrderByOrderId = async (orderId, orderUpdate) => {
    console.log(orderUpdate);
    const path = `/api/v1/orders/${orderId}`;
    const res = await axios.put(path, orderUpdate);
    return res?.data;
}