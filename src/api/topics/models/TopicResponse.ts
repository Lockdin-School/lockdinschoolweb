export type TopicStatus = "draft" | "published" | "archived";
export type TopicResponse = {
    id: string;

    code: string;
    slug: string;
    title: string;
    shortDescription: string | null;
    description: string | null;

    subjectId: string;
    term: number;
    displayOrder?: number | null;
    estimatedHours?: number | null;

    totalLessons: number;
    totalResources: number;
    totalQuizzes: number;
    totalAssignments: number;

    status: TopicStatus;
    isFeatured: boolean;
    isFree: boolean;

    version: number;

    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    archivedAt: string | null;
};

export type GetTopicsResponse = TopicResponse[];