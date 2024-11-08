import { List, Typography, Button, Modal, Divider } from "antd";
import { ShoppingCartOutlined, PlayCircleOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDurationToObject, formatDurationToString } from "../hooks/formatDuration";
import LoginModal from "../../../components/LoginModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CourseDetail = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};

    const showVideo = (video) => setSelectedVideo(video);
    const userId = useSelector(state => state?.account?.user?.id);

    const handleAddToCart = () => {
        if (!userId) return setIsModalVisible(true);
        toast.warn("Chức năng đang phát triển, vui lòng thử lại sau");
    };

    const handleBuyNow = () => {
        if (!userId) return setIsModalVisible(true);
        navigate("/online-payment", { state: { course: course } });
    };

    const publicDate = new Date(course.updatedAt || course.playlistDetails.publishedAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const time = formatDurationToString(course.playlistDetails.totalDuration);

    const handleExpandDesc = () => setShowFullDescription(prev => !prev);

    return (
        <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto space-y-6">
            <Typography.Title level={2} className="text-blue-600">{course.playlistDetails.title}</Typography.Title>
            <Typography.Paragraph
                ellipsis={showFullDescription ? false : { rows: 3 }}
                className="text-gray-500"
                forceRender
            >
                {course.playlistDetails.description}
            </Typography.Paragraph>
            <div
                onClick={handleExpandDesc}
                className="text-blue-800 text-base cursor-pointer"
            >
                {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </div>

            {/* Course Info  */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between bg-gray-50 p-4 rounded-md shadow-md mb-6">
                <div className="flex flex-col space-y-2">
                    <Typography.Text className="text-xl font-semibold text-red-500">
                        {(course.discountedPrice || course.price).toLocaleString()}đ
                        {course.discountedPrice && (
                            <span className="line-through text-gray-500 ml-2">{course.price.toLocaleString()}đ</span>
                        )}
                    </Typography.Text>
                    <Typography.Text className="text-gray-700">Được tạo bởi: {course.user.fullName}</Typography.Text>
                    <Typography.Text className="text-gray-700">Tác giả: {course.playlistDetails.channelTitle}</Typography.Text>
                    <Typography.Text className="text-gray-700">Cập nhật lần cuối: {publicDate}</Typography.Text>
                    <Typography.Text className="text-gray-700">Tổng thời lượng: {time}</Typography.Text>
                    <Typography.Text className="text-gray-700">Số bài giảng: {course.playlistDetails.videos.length}</Typography.Text>
                </div>
                <div className="flex space-x-4 mt-4 lg:mt-0 lg:ml-4">
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                    <Button
                        type="primary"
                        icon={<DollarOutlined />}
                        onClick={handleBuyNow}
                        className="bg-green-500 hover:bg-green-600"
                    >
                        Mua ngay
                    </Button>
                </div>
            </div>

            <Divider />

            {/* Video List */}
            <List
                itemLayout="horizontal"
                dataSource={course.playlistDetails.videos}
                renderItem={(video) => {
                    const { hours, minutes, seconds } = formatDurationToObject(video.duration);
                    return (
                        <List.Item
                            key={video.videoId}
                            className="hover:bg-gray-100 rounded-lg p-3 transition-all duration-200"
                            actions={[
                                <Button
                                    key={video.id}
                                    type="primary"
                                    icon={<PlayCircleOutlined />}
                                    onClick={() => showVideo(video)}
                                    className="bg-blue-500 hover:bg-blue-600 border-none"
                                >
                                    Xem video
                                </Button>,
                                <div key={video.id} className="w-10">
                                    {hours > 0 ? hours + ":" : ""}
                                    {minutes > 0 ? minutes : "00"}:
                                    {seconds < 10 ? "0" + seconds : seconds}
                                </div>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<img src={video.thumbnail} alt={video.title} className="w-20 h-20 rounded-md object-cover" />}
                                title={<Typography.Text strong>{video.title}</Typography.Text>}
                                description={
                                    <Typography.Paragraph
                                        ellipsis={{ rows: 2, expandable: false }}
                                        className="text-gray-500"
                                    >
                                        {video.description}
                                    </Typography.Paragraph>
                                }
                            />
                        </List.Item>
                    )
                }}
            />

            <Modal
                title={<Typography.Title level={4} className="text-blue-600">{selectedVideo?.title}</Typography.Title>}
                open={!!selectedVideo}
                footer={null}
                onCancel={() => setSelectedVideo(null)}
                width={800}
                className="rounded-md overflow-hidden"
            >
                {selectedVideo && (
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="450"
                            src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                            title={selectedVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-b-md"
                        ></iframe>
                    </div>
                )}
            </Modal>

            <LoginModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </div>
    );
};

export default CourseDetail;
