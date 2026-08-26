import {useQuery} from "@tanstack/react-query";
import { getQuizById} from "../quizzes.ts";

export const useQuiz = (quizId: string) => {
    return useQuery({
        queryKey: ["quizzes", quizId],
        queryFn: () => getQuizById(quizId),
        enabled: !!quizId,
    });
};