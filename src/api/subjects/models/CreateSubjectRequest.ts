export type SubjectStatus = "Draft" | "Published" | "Archived";

export type CreateSubjectRequest = {
    code: string;
    slug: string;
    title: string;

    shortDescription?: string | null;
    description?: string | null;

    curriculumId: string;
    gradeId: string;
    categoryId: string;
    languageCode?: string | null;

    coverImageUrl?: string | null;
    iconUrl?: string | null;
    themeColor?: string | null;
    displayOrder?: number | null;

    estimatedHours?: number | null;

    status?: SubjectStatus | null;
    isFeatured?: boolean | null;
    isFree?: boolean | null;
};