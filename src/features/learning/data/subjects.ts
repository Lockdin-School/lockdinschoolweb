export type Concept = {
    id: string;
    name: string;
};

export type Topic = {
    id: string;
    name: string;
    concepts: Concept[];
};

export type Subject = {
    id: string;
    name: string;
    topics: Topic[];
};

export const subjects: Subject[] = [
    {
        id: "mathematics",
        name: "Mathematics",
        topics: [
            {
                id: "functions",
                name: "Functions",
                concepts: [
                    {
                        id: "domain",
                        name: "Domain",
                    },
                    {
                        id: "range",
                        name: "Range",
                    },
                    {
                        id: "types-of-functions",
                        name: "Types of Functions",
                    },
                    {
                        id: "graphs",
                        name: "Graphs",
                    },
                ],
            },
            {
                id: "algebra",
                name: "Algebra",
                concepts: [
                    {
                        id: "expressions",
                        name: "Expressions",
                    },
                    {
                        id: "equations",
                        name: "Equations",
                    },
                    {
                        id: "inequalities",
                        name: "Inequalities",
                    },
                ],
            },
            {
                id: "calculus",
                name: "Calculus",
                concepts: [
                    {
                        id: "limits",
                        name: "Limits",
                    },
                    {
                        id: "derivatives",
                        name: "Derivatives",
                    },
                    {
                        id: "integrals",
                        name: "Integrals",
                    },
                ],
            },
            {
                id: "geometry",
                name: "Geometry",
                concepts: [
                    {
                        id: "triangles",
                        name: "Triangles",
                    },
                    {
                        id: "circles",
                        name: "Circles",
                    },
                ],
            },
        ],
    },

    {
        id: "physics",
        name: "Physics",
        topics: [
            {
                id: "mechanics",
                name: "Mechanics",
                concepts: [
                    {
                        id: "motion",
                        name: "Motion",
                    },
                    {
                        id: "forces",
                        name: "Forces",
                    },
                    {
                        id: "momentum",
                        name: "Momentum",
                    },
                ],
            },
            {
                id: "waves",
                name: "Waves",
                concepts: [
                    {
                        id: "frequency",
                        name: "Frequency",
                    },
                    {
                        id: "wavelength",
                        name: "Wavelength",
                    },
                ],
            },
        ],
    },

    {
        id: "chemistry",
        name: "Chemistry",
        topics: [
            {
                id: "matter",
                name: "Matter",
                concepts: [
                    {
                        id: "atoms",
                        name: "Atoms",
                    },
                    {
                        id: "molecules",
                        name: "Molecules",
                    },
                ],
            },
            {
                id: "reactions",
                name: "Chemical Reactions",
                concepts: [
                    {
                        id: "balancing",
                        name: "Balancing Equations",
                    },
                    {
                        id: "reaction-rates",
                        name: "Reaction Rates",
                    },
                ],
            },
        ],
    },
];