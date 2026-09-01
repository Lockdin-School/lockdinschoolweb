import {identity_api} from "@/api/client.ts";

// const isNotFoundError = (error: unknown) => {
//     return axios.isAxiosError(error) && error.response?.status === 404;
// };

export const createStudentProfile = async (studentProfile: any) => {
    const response = await identity_api.post(
        '/students',
        studentProfile,
    );

    if (!response) {
        throw new Error(`Failed to create student profile.`);
    }

    return response.data;
}

export const getStudentProfileByAccountId = async (accountId: string) => {
    const response = await identity_api.get(
        `/students/account/${accountId}`,
    );

    if (!response) {
        throw new Error(`Failed to fetch student profile.`);
    }

    return response.data;
}