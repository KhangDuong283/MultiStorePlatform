// CheckoutSummary.jsx
import { Divider, Typography } from 'antd';
const { Text } = Typography;

const CheckoutSummary = ({ totalAmount, selectedItemsLength, shipCost }) => (
    <>
        <Divider />
        <div className="text-center my-4">
            <Text strong>Tổng sản phẩm: <span className="text-blue-700">{selectedItemsLength}</span></Text>
            <br />
            <Text strong>Phí vận chuyển: <span className="text-blue-700">{shipCost?.toLocaleString()} ₫</span></Text>
            <br />
            <Text strong>Tổng tiền: <span className="text-red-500 font-semibold">{(totalAmount + shipCost)?.toLocaleString()} ₫</span></Text>
        </div>
        <Divider />
    </>
);

export default CheckoutSummary;
