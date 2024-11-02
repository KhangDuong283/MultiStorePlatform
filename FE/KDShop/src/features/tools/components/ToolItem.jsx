import { Button, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCreateCartTool } from "../../cart/hooks/useCreateCartTool";
import { useCheckExistCartTool } from "../../cart/hooks/useCheckExistCartTool";
import { useUpdateCartItem } from "../../cart/hooks/useUpdateCartItem"
import { useSelector } from "react-redux";
import { useCart } from "../../cart/hooks/useCart";
import { getCartTool } from "../../../services/CartToolService";
import { useCartContext } from "../../../components/CartProvider";
import { toast } from "react-toastify";
const { Meta } = Card;

const ToolItem = ({ tool }) => {
    const { cartItems, setCartItems, cartQuantity, setCartQuantity } = useCartContext();

    const userId = useSelector(state => state?.account?.user?.id);
    const { carts } = useCart(userId);
    const { createCartItem, isCreating } = useCreateCartTool();
    const { updateCartItem } = useUpdateCartItem();
    const { checkExist } = useCheckExistCartTool();

    const handleAddToCart = async (tool) => {
        const newCartItem = {
            tool: { toolId: tool.toolId },
            cart: { cartId: carts?.cartId },
            quantity: 1
        };

        const cartToolId = await checkExist(newCartItem);
        if (cartToolId === 0) {
            createCartItem(newCartItem);
            setCartQuantity(cartQuantity + 1);
        } else {
            const cartTools = await getCartTool(cartToolId);
            const newQuantity = cartTools.quantity += 1;

            setCartItems(cartItems.map(item =>
                item.id === cartToolId ? { ...item, quantity: newQuantity } : item

            ));

            updateCartItem({
                data: { quantity: cartTools.quantity },
                cartToolId: cartToolId
            }, {
                onSuccess: () => toast.success("Thêm vào giỏ hàng thành công"),
                onError: (error) => toast.error(error.message || "Thêm vào giỏ hàng thất bại")
            });
        }

    };

    return (
        <Card
            className="transition-transform duration-100 hover:scale-105 shadow-md"
            hoverable
            cover={<img alt={tool.name} src={tool.imageUrl} className="h-40 w-full object-cover" />}
            actions={[
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    className="transition-transform duration-100 hover:scale-105"
                    key="cart"
                    onClick={() => handleAddToCart(tool)}
                    disabled={isCreating}
                >
                    {isCreating ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                </Button>
            ]}
        >
            <Meta
                style={{ padding: "0.5rem" }}
                title={<span className="text-base">{tool.name}</span>}
                description={
                    <div className="text-sm">
                        <div className="text-red-500 font-semibold">
                            {tool.discountedPrice !== 0 ? (
                                <>
                                    {tool.discountedPrice.toLocaleString()}₫
                                    <span className="text-gray-500 line-through">{tool.price.toLocaleString()}₫</span>
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
    );
};

export default ToolItem;
