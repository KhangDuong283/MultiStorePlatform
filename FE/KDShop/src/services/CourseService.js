import axios from "./axios-customize"

export const callGetAllCourse = async () => {
    const path = "/api/v1/courses";
    const res = await axios.get(path);
    return res?.data;
}