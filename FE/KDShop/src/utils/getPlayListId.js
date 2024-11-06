export function getPlaylistId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:playlist\?list=|(?:.*\/)?(?:p|list)\/))([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}