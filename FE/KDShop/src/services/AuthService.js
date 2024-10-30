import axios from "./axios-customize"

export const login = (email, password) => {
    return axios.post(`/api/v1/auth/login`, { email, password });
}

export const getAccount = () => {
    return axios.get(`/api/v1/auth/account`);
}

export const checkEmailExists = async (email) => {
    return axios.get(`/api/v1/auth/check-email/${email}`);
};