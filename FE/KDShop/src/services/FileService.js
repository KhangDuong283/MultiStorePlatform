import axios from './axios-customize';

export const uploadFile = async (file, folderName) => {
    // Tạo đối tượng FormData để gửi file qua multipart/form-data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folderName);

    // Gửi request lên API để upload file
    const res = await axios.post('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res?.data;
};