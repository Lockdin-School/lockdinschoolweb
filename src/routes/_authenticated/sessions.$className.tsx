import {createFileRoute, useParams} from '@tanstack/react-router'
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {useStudentProfile} from "@/api/student-profiles/queries/useStudentProfile.ts";
import type {LiveKitConnectionRequest} from "@/api/live-sessions/models/SessionConnection.ts";
import {useLiveSessions} from "@/api/live-sessions/queries/useLiveSessions.ts";
import {TokenSource} from "livekit-client";
import {LiveKitRoom, SessionProvider, useSession} from "@livekit/components-react";
import "@livekit/components-styles";
import "@/livekit-theme.css";
import LockdinClassroom from "@/features/classroom/components/LockdinClassroom.tsx";

export const Route = createFileRoute('/_authenticated/sessions/$className')({
  component: RouteComponent,
})

function RouteComponent() {

    const {className} = useParams({
        from: "/_authenticated/sessions/$className",
    })
    const {data: account, isLoading: authLoading, isError: isAuthError, error: authError} = useAuthUser();
    const {data: student, isLoading: studentLoading, isError: isStudentError, error: studentError} = useStudentProfile(account?.userInfo?.id)



    const sessionRequest: LiveKitConnectionRequest = {
        roomName: className,
        participantName: student.firstName,
        participantIdentity: student.id,
    }

    const {data: sessionResponse, isLoading: sessionLoading, isError: isSessionError, error: sessionError} = useLiveSessions(sessionRequest);

    const serverUrl = sessionResponse?.serverUrl ?? '';
    const token = sessionResponse?.participantToken ?? '';

    const tokenSource = TokenSource.literal({serverUrl: serverUrl, participantToken: token});
    const session = useSession(tokenSource);

    if (authLoading || studentLoading || sessionLoading) {
        return <p>Loading...</p>
    }

    if (isAuthError || isStudentError || isSessionError) {
        throw new Error(`Error: ${sessionError?.message || authError?.message || studentError?.message}`);
    }



    return (
        <SessionProvider session={session}>
            <LiveKitRoom
                className=""
                token={token}
                serverUrl={serverUrl}
                connect
            >
                <LockdinClassroom
                    subjectLabel="Mathematics"
                    lessonTitle="Functions & Transformations"
                    activity={{
                        questionNumber: "03",
                        answeredCount: 18,
                        totalCount: 24,
                        prompt: "Solve for x: 2(x + 3) = 14",
                        correctPercentage: 28,
                    }}
                />
            </LiveKitRoom>
        </SessionProvider>
    )
}
