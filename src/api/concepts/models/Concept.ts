export interface Definition {
    title?: string;
    text: string;
}

export interface ExplanationSection {
    subtitle?: string;
    paragraphs: string[];
}

export interface Example {
    title: string;
    description?: string;
    expression?: string;
    steps: string[];        // Adjust if you have a more complex type
    conclusion?: string;
}

export interface Misconception {
    misconception: string;
    correction: string;
}

export interface Concept {
    id: string;
    topicId: string;
    title: string;
    displayOrder: number;
    definitions: Definition[];
    explanation: ExplanationSection[];
    analogy?: ExplanationSection[];
    examples: Example[];
    misconceptions: Misconception[];
    summary?: string;
    createdAt: string;
    updatedAt: string;
}

export type GetConceptsResponse = Concept[];