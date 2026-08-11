import type {MaterialType} from "../api/materials/models/CreateMaterialRequest.ts";

const materialRoute = (materialType: MaterialType): string => {
    switch (materialType) {
        case "Lesson":
            return 'lessons';
        case "Resource":
            return 'resources';
        case "Quiz":
            return 'quizzes';
        case "Exercise":
            return 'exercises';
        case "Assignment":
            return 'assignments'
        default:
            throw new Error("Unknow Material Type");
    }
}

export {
    materialRoute,
}