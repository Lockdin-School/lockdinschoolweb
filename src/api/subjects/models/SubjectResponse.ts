export type SubjectStatus = "draft" | "published" | "archived";

export type SubjectResponse = {
    id: string;

    code: string;
    slug: string;
    title: string;
    shortDescription: string | null;
    description: string | null;

    curriculumId: string;
    gradeId: string;
    categoryId: string;
    languageCode: string;

    coverImageUrl: string | null;
    iconUrl: string | null;
    themeColor: string | null;
    displayOrder: number;

    estimatedHours: number | null;

    totalModules: number;
    totalTopics: number;
    totalLessons: number;
    totalResources: number;
    totalQuizzes: number;
    totalAssignments: number;
    totalExams: number;

    status: SubjectStatus;
    isFeatured: boolean;
    isFree: boolean;

    version: number;

    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    archivedAt: string | null;
};

export type SearchSubjectsResponse = SubjectResponse[];