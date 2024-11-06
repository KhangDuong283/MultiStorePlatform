// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { getPlaylistId } from '../../../utils/getPlayListId';

// const API_KEY = 'AIzaSyDjCUacTnv_xPxbjXxEia3GQTa-NlhGxRA';

// async function fetchPlaylistDetails(playlistUrl) {
//     const playlistId = getPlaylistId(playlistUrl);

//     if (!playlistId) {
//         throw new Error('Invalid playlist URL');
//     }

//     const playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${API_KEY}`;
//     const videoApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;

//     try {
//         // Lấy thông tin playlist
//         const playlistResponse = await axios.get(playlistApiUrl);
//         const playlistData = playlistResponse.data;

//         if (!playlistData.items || playlistData.items.length === 0) {
//             throw new Error("Playlist not found");
//         }

//         const playlist = playlistData.items[0];
//         const playlistDetails = {
//             title: playlist.snippet.title,
//             description: playlist.snippet.description,
//             thumbnail: playlist.snippet.thumbnails.high.url,
//             videoCount: playlist.contentDetails.itemCount,
//             publishedAt: playlist.snippet.publishedAt,
//             videos: []
//         };

//         // Lấy thông tin các video trong playlist
//         const videoResponse = await axios.get(videoApiUrl);
//         const videoData = videoResponse.data;

//         if (videoData.items && videoData.items.length > 0) {
//             videoData.items.forEach(videoItem => {
//                 const video = {
//                     title: videoItem.snippet.title,
//                     videoId: videoItem.snippet.resourceId.videoId,
//                     description: videoItem.snippet.description,
//                     thumbnail: videoItem.snippet.thumbnails.medium.url,
//                     publishedAt: videoItem.snippet.publishedAt
//                 };
//                 playlistDetails.videos.push(video);
//             });
//         }

//         return playlistDetails;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export function usePlaylistDetails(playListUrl) {
//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ['playlistDetails', playListUrl],
//         queryFn: () => fetchPlaylistDetails(playListUrl),
//         enabled: !!playListUrl, // chỉ gọi khi playlistUrl có giá trị
//     });

//     return {
//         playlistDetails: data,
//         isLoading,
//         isError,
//         error: error?.message,
//     };
// }
