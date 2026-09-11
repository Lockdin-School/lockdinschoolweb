import type {
    LiveKitConnectionRequest,
    LiveKitConnectionResponse
} from "@/api/live-sessions/models/SessionConnection.ts";
import type {AxiosResponse} from "axios";
import {identity_api} from "@/api/client.ts";

export const getLiveSessionToken = async (
    sessionRequest: LiveKitConnectionRequest
): Promise<LiveKitConnectionResponse> => {

    const response: AxiosResponse<LiveKitConnectionResponse> = await identity_api.post(`/sessions/token`, sessionRequest);

    if (!response) {
        throw new Error("Could not get live session token");
    }

    return response.data;
};