import {useQuery} from "@tanstack/react-query";
import {getStudentProfileByAccountId} from "@/api/student-profiles/studentProfiles.ts";

export const studentProfileKeys = {
    all: ['studentProfiles'] as const,
    byAccountId: (accountId: string) =>
        [...studentProfileKeys.all, 'account', accountId] as const,
};

export const useStudentProfile = (accountId?: string) => {
    return useQuery({
        queryKey: accountId
            ? studentProfileKeys.byAccountId(accountId)
            : studentProfileKeys.all,
        queryFn: () => getStudentProfileByAccountId(accountId!),
        enabled: !!accountId,
        retry: false,
    });
};

