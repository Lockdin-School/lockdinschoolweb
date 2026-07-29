export type TopicStatus = "Draft" | "Published" | "Archived";

export type CreateTopicRequest = {
    code: string;
    slug: string;
    title: string;

    shortDescription?: string | null;
    description?: string | null;

    subjectId: string;
    term: number;
    displayOrder?: number | null;
    estimatedHours?: number | null;

    status?: TopicStatus | null;
    isFeatured?: boolean | null;
    isFree?: boolean | null;
};