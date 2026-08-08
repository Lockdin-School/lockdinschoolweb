import {useQuery} from "@tanstack/react-query";
import {getLessonById} from "../lessons.ts";

export const useLesson = (lessonId: string) => {
    return useQuery({
        queryKey: ["lessons", lessonId],
        queryFn: () => getLessonById(lessonId),
        enabled: !!lessonId,
    });
};