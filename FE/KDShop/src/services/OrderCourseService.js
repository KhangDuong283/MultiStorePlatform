import axios from "./axios-customize"

export const callCreateOrderCourse = async (orderCourse) => {
    const path = `/api/v1/ordercourses`;
    const res = await axios.post(path, orderCourse);
    return res?.data;
}