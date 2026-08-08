import type {MaterialStatus, MaterialType} from "./CreateMaterialRequest.ts";

export type MaterialResponseDTO = {
    material_id: string; // UUID

    code: string;
    slug: string;

    title: string;
    short_description?: string | null;
    description?: string | null;

    topic_id: string; // UUID

    material_type: MaterialType;

    display_order: number;
    estimated_duration_seconds?: number | null;

    view_count: number;

    status: MaterialStatus;

    is_featured: boolean;
    is_free: boolean;

    version: number;

    created_at: string; // ISO 8601
    updated_at: string; // ISO 8601

    published_at?: string | null;
    archived_at?: string | null;
}

export type GetMaterialsResponse = MaterialResponseDTO[];