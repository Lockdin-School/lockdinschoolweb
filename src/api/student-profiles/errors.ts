import axios from "axios";

export const isStudentProfileNotFoundError = (error: unknown) => {
    return axios.isAxiosError(error) && error.response?.status === 404;
};