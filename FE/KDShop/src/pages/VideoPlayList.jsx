import { useEffect, useState } from "react";
import axios from "axios";
import { List, Skeleton, Typography, Button, Modal } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const CourseDetail = ({ playlistId, apiKey }) => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    apiKey = "AIzaSyDjCUacTnv_xPxbjXxEia3GQTa-NlhGxRA";
    playlistId = "PLp1vfj-6olW8lapBHPGT5gxFO5_NKTKsW";

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const playlistResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlists`,
                    {
                        params: {
                            part: "snippet",
                            id: playlistId,
                            key: apiKey,
                        },
                    }
                );

                const playlist = playlistResponse.data.items[0];
                setPlaylistInfo({
                    title: playlist.snippet.title,
                    description: playlist.snippet.description,
                });

                const videosResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems`,
                    {
                        params: {
                            part: "snippet",
                            playlistId: playlistId,
                            maxResults: 50,
                            key: apiKey,
                        },
                    }
                );

                const videoItems = videosResponse.data.items.map(item => ({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.medium.url,
                }));

                setVideos(videoItems);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu playlist:", error);
            }
        };

        fetchPlaylistData();
    }, [playlistId, apiKey]);

    const showVideo = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
            {loading ? (
                <Skeleton active />
            ) : (
                <>
                    <Typography.Title level={2} className="text-blue-600">{playlistInfo?.title}</Typography.Title>
                    <Typography.Paragraph className="text-gray-600 mb-6">{playlistInfo?.description}</Typography.Paragraph>

                    <List
                        itemLayout="horizontal"
                        dataSource={videos}
                        className="space-y-4"
                        renderItem={(video) => (
                            <List.Item
                                key={video.id}
                                className="hover:bg-gray-100 rounded-lg p-3"
                                actions={[
                                    <Button
                                        key={`button-${video.id}`}
                                        type="primary"
                                        icon={<PlayCircleOutlined />}
                                        onClick={() => showVideo(video)}
                                        className="bg-blue-500 hover:bg-blue-600 border-none"
                                    >
                                        Xem video
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<img src={video.thumbnail} alt={video.title} className="w-20 h-20 rounded-md object-cover" />}
                                    title={<Typography.Text strong>{video.title}</Typography.Text>}
                                    description={<Typography.Paragraph ellipsis className="text-gray-500">{video.description}</Typography.Paragraph>}
                                />
                            </List.Item>
                        )}
                    />

                    <Modal
                        title={<Typography.Title level={4} className="text-blue-600">{selectedVideo?.title}</Typography.Title>}
                        open={!!selectedVideo}
                        footer={null}
                        onCancel={() => setSelectedVideo(null)}
                        width={800}
                        style={{ body: { padding: 0 } }}
                        className="rounded-md overflow-hidden"
                    >
                        {selectedVideo && (
                            <div className="video-container">
                                <iframe
                                    width="100%"
                                    height="450"
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-b-md"
                                ></iframe>
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
};

export default CourseDetail;
