import {useQuery} from "@tanstack/react-query";
import {searchSubjects} from "../subjects.ts";

export const useSubjects = () => {
    // todo: include search params
    return useQuery({
        queryKey: ["subjects"],
        queryFn: () => searchSubjects(),
        enabled: true,
    });
};