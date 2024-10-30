import { Button, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ToolItem = ({ tool }) => {
    return (
        <Card
            className="transition-transform duration-100 hover:scale-105 shadow-md"
            hoverable
            cover={<img alt={tool.name} src={tool.imageUrl} className="h-40 w-full object-cover" />}
            actions={[<Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                className="transition-transform duration-100 hover:scale-105"
                key="cart"
            >
                Thêm vào giỏ hàng
            </Button>]}
        >
            <Meta
                style={{ padding: "0.5rem" }}
                title={<span className="text-base">{tool.name}</span>}
                description={
                    <div className="text-sm">
                        <div className="text-red-500 font-semibold">
                            {tool.discountedPrice} <span className="text-gray-500 line-through">{tool.price}</span>
                        </div>
                        <div className="text-gray-500">Còn lại: {tool.stockQuantity} sản phẩm</div>
                    </div>
                }
            />
        </Card>
    );
};

export default ToolItem;
