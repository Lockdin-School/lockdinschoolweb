import axios from "axios";

export const isStudentProfileNotFoundError = (error: any) => {
    return axios.isAxiosError(error) && error.response?.status === 404;
};