import axios from './axios-customize';

export const callGetUserByUserId = async (userId) => {
    const res = await axios.get(`/api/v1/users/${userId}`);
    return res?.data;
}