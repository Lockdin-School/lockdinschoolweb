import {useQuery} from "@tanstack/react-query";
import {searchSubjects} from "../subjects.ts";

export const useSubjects = (grade?: number) => {
    return useQuery({
        queryKey: ["subjects", { grade }],
        queryFn: () => searchSubjects(grade),
        enabled: true,
    });
};