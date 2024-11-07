import { useTools } from "../hooks/useTools";
import ToolItem from "./ToolItem";

const ToolList = () => {
    const { isLoading, error, tools } = useTools();

    if (isLoading) {
        return <div className="text-center">Đang tải dữ liệu sản phẩm...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Đã xảy ra lỗi: {error.message}</div>;
    }

    const products = tools?.result || [];

    if (products.length === 0) {
        return <div className="text-center">Không có sản phẩm nào.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((tool) => (
                <ToolItem key={tool.toolId} tool={tool} />
            ))}
        </div>
    );
};

export default ToolList;
