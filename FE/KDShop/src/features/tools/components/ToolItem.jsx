import { Button, Card, Modal } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCreateCartTool } from "../../cart/hooks/useCreateCartTool";
import { useCheckExistCartTool } from "../../cart/hooks/useCheckExistCartTool";
import { useUpdateCartItem } from "../../cart/hooks/useUpdateCartItem";
import { useSelector } from "react-redux";
import { useCart } from "../../cart/hooks/useCart";
import { useCartContext } from "../../../components/CartProvider";
import { TOOL_URL } from "../../../utils/Config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../../cart/handleAddtoCart";

const { Meta } = Card;

const ToolItem = ({ tool }) => {
    const navigate = useNavigate();
    const { cartItems, setCartItems, cartQuantity, setCartQuantity } = useCartContext();
    const userId = useSelector(state => state?.account?.user?.id);
    const permissions = useSelector(state => state.account.user?.role?.permissions);
    const { carts } = useCart(userId);
    const { createCartItem, isCreating } = useCreateCartTool();
    const { updateCartItem } = useUpdateCartItem();
    const { checkExist } = useCheckExistCartTool();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const onAddToCartClick = async () => {
        await handleAddToCart({
            tool,
            permissions,
            carts,
            checkExist,
            createCartItem,
            updateCartItem,
            cartItems,
            setCartItems,
            cartQuantity,
            setCartQuantity,
            addQuantity: 1,
        });
    };

    const handleLogin = () => {
        setIsModalVisible(false);
        navigate("/auth/login");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Hàm chuyển đến trang chi tiết sản phẩm
    const navigateToDetailPage = () => {
        navigate(`/tool/${tool.toolId}`);
    };

    return (
        <>
            <Card
                className="transition-transform duration-100 hover:scale-105 shadow-md"
                hoverable
                cover={
                    <img
                        alt={tool.name}
                        src={TOOL_URL + tool.imageUrl}
                        className="h-52 w-full object-cover cursor-pointer"
                        onClick={navigateToDetailPage}
                    />
                }
                actions={[
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        className="transition-transform duration-100 hover:scale-105"
                        key="cart"
                        onClick={onAddToCartClick}
                        disabled={isCreating}
                    >
                        {isCreating ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                    </Button>
                ]}
            >
                <Meta
                    title={
                        <span
                            className="text-base cursor-pointer"
                            onClick={navigateToDetailPage}
                        >
                            {tool.name}
                        </span>
                    }
                    description={
                        <div className="text-sm" onClick={navigateToDetailPage}>
                            <div className="text-red-500 font-semibold">
                                {tool.discountedPrice !== 0 ? (
                                    <>
                                        <span className="text-gray-500 line-through">
                                            {tool.price.toLocaleString()}₫
                                        </span>{" "}
                                        {tool.discountedPrice.toLocaleString()}₫
                                    </>
                                ) : (
                                    <>
                                        {tool.price.toLocaleString()}₫
                                    </>
                                )}
                            </div>
                            <div className="text-gray-500">Còn lại: {tool.stockQuantity} sản phẩm</div>
                        </div>
                    }
                />
            </Card>

            <Modal
                title="Thông báo"
                open={isModalVisible}
                onOk={handleLogin}
                onCancel={handleCancel}
                okText="Đăng nhập"
                cancelText="Hủy"
            >
                <p>Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.</p>
            </Modal>
        </>
    );
};

export default ToolItem;
