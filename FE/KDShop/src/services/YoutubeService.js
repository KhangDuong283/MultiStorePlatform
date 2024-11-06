import axios from "axios";
import { getPlaylistId } from "../utils/getPlayListId";
import { parseDuration } from "../features/courses/hooks/formatDuration";

const API_KEY_YOUTUBE = 'AIzaSyDjCUacTnv_xPxbjXxEia3GQTa-NlhGxRA';

// Hàm lấy thông tin một playlist
async function fetchPlaylistDetails(playlistUrl) {
    const playlistId = getPlaylistId(playlistUrl);

    if (!playlistId) {
        throw new Error('Url không đúng định dạng');
    }

    const playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${API_KEY_YOUTUBE}`;
    const videoApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY_YOUTUBE}`;

    try {
        // Lấy thông tin playlist
        const playlistResponse = await axios.get(playlistApiUrl);
        const playlistData = playlistResponse.data;

        if (!playlistData.items || playlistData.items.length === 0) {
            throw new Error("Không tìm thấy playlist");
        }

        const playlist = playlistData.items[0];
        // console.log(playlist);
        const playlistDetails = {
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            thumbnail: playlist.snippet.thumbnails.high.url,
            videoCount: playlist.contentDetails.itemCount,
            publishedAt: playlist.snippet.publishedAt,
            totalDuration: 0,
            videos: []
        };

        // Lấy thông tin các video trong playlist
        const videoResponse = await axios.get(videoApiUrl);
        const videoData = videoResponse.data;
        // console.log(videoData);

        let totalDurationInSeconds = 0;

        if (videoData.items && videoData.items.length > 0) {
            for (let videoItem of videoData.items) {
                const video = {
                    title: videoItem.snippet.title,
                    videoId: videoItem.snippet.resourceId.videoId,
                    description: videoItem.snippet.description,
                    thumbnail: videoItem.snippet.thumbnails.medium.url,
                    publishedAt: videoItem.snippet.publishedAt,
                    duration: 0,
                };

                // Lấy thời gian của video
                const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${video.videoId}&key=${API_KEY_YOUTUBE}`;
                const videoDetailsResponse = await axios.get(videoDetailsUrl);
                const videoDetails = videoDetailsResponse.data;
                // console.log(videoDetails);

                if (videoDetails.items && videoDetails.items.length > 0) {
                    const videoDuration = videoDetails.items[0].contentDetails.duration;
                    const videoDurationInSeconds = parseDuration(videoDuration);
                    video.duration = videoDurationInSeconds;
                    totalDurationInSeconds += videoDurationInSeconds;
                }

                playlistDetails.videos.push(video);
            }
        }

        // Lưu tổng thời gian playlist
        playlistDetails.totalDuration = totalDurationInSeconds;

        return playlistDetails;
    } catch (error) {
        throw new Error(error.message);
    }
}


// lấy thông tin chi tiết của tất cả playlist 
export async function fetchAllPlaylistDetails(allPlayList) {
    const courseUrls = allPlayList.map(course => course.courseUrl);
    const allPlaylistDetails = [];

    for (let url of courseUrls) {
        try {
            const details = await fetchPlaylistDetails(url);
            allPlaylistDetails.push({
                ...allPlayList.find(course => course.courseUrl === url),
                playlistDetails: details
            });
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết khóa học có url: ' + url, error);
        }
    }

    return allPlaylistDetails;
}
