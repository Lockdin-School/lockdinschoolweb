export interface LiveKitConnectionRequest {
    roomName: string;
    participantName?: string;
    participantIdentity?: string;
    // participantMetadata?: string;
    // participantAttributes?: Record<string, string>;
}

export interface LiveKitConnectionResponse {
    serverUrl: string;
    participantToken: string;
}