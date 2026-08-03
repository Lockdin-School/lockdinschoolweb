export type MaterialType = "Lesson" | "Exercise" | "Quiz" | "Assignment" | "Resource";
export type MaterialStatus = "Draft" | "Published" | "Archived";

export type CreateMaterialRequest = {
    code: string;
    slug: string;

    title: string;
    short_description?: string | null;
    description?: string | null;

    topic_id: string;

    material_type: MaterialType;

    display_order: number;
    estimated_duration_seconds?: number | null;

    is_featured: boolean;
    is_free: boolean;
}

