import {useQuery} from "@tanstack/react-query";
import type {LiveKitConnectionRequest} from "@/api/live-sessions/models/SessionConnection.ts";
import {getLiveSessionToken} from "@/api/live-sessions/live-sessions.ts";

export const useLiveSessions = (sessionRequest: LiveKitConnectionRequest) => {
    return useQuery({
        queryKey: ["live-sessions"],
        queryFn: () => getLiveSessionToken(sessionRequest),
        enabled: !!sessionRequest.roomName,
    });
};