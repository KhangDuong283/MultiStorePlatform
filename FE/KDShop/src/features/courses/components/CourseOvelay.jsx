import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { formatDurationToString } from "../hooks/formatDuration";

const CourseOverlay = ({ updatedAt, publishedAt, totalVideos, duration, onAddToCartClick, name, description }) => {
    // Chuyển đổi thời gian từ giây sang giờ, phút, giây
    const time = formatDurationToString(duration);
    const publicDate = new Date(updatedAt || publishedAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    return (
        <div className="hover:scale-105 absolute inset-0 bg-white flex flex-col p-4 items-center justify-between text-black rounded-lg shadow-lg shadow-xl shadow-2xl">
            <div className="mb-6 space-y-2">
                <p className="text-base font-bold">{name}</p>
                <p className="text-sm">
                    <span className="font-semibold">Cập nhật: </span>{publicDate}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Tổng số video: </span>{totalVideos}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Tổng số: </span>{time}
                </p>

                {/* Hiển thị mô tả khóa học */}
                {description && (
                    <p className="text-sm mt-2 text-gray-600">
                        <span className="font-semibold">Mô tả: </span>
                        {description.length > 150 ? `${description.substring(0, 150)}...` : description}
                    </p>
                )}
            </div>
            <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={onAddToCartClick}
                size="small"
                className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
                Thêm vào giỏ hàng
            </Button>
        </div>
    );
};

export default CourseOverlay;
