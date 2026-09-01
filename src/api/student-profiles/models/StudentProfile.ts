export type Curriculum = 'CAPS' | 'CAMBRIDGE' | 'IEB'; // adjust to backend enum

export type StudentProfile = {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    grade: number;
    curriculum: Curriculum;
    schoolName?: string | null;
    province?: string | null;
    onboardingCompleted: boolean;
};

export type StudentProfileNew = {
    accountId: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    grade: number;
    curriculum: Curriculum;
    schoolName?: string | null;
    province?: string | null;
    onboardingCompleted: boolean;
};