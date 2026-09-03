import Markdown  from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type {Concept} from "@/api/concepts/models/Concept.ts";


export const ConceptRenderer = ({ concept }: {concept: Concept}) => {

    const { title, definitions, explanation, analogy, examples, misconceptions, summary} = concept;

    const renderDefinition = (def: { title?: string; text: string }) => (
        <div className="py-3 gap-y-2 flex flex-col text-[#1e2914] mb-3">
            {def.title && (
                <b className="block text-left text-[22px] font-alliance-2 tracking-tighter   mb-1">
                    {def.title.replace("CAPS", "")}
                </b>
            )}
            <p className="tracking-tighter text-left">
                <Markdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[[rehypeKatex]]}
                >
                    {def.text}
                </Markdown>
            </p>
        </div>
    );

    const renderSection = (
        title: string,
        sections: { subtitle?: string; paragraphs: string[] }[]
    ) => (
        <div className="mb-6">
            <h3 className="text-2xl text-left font-alliance-2 tracking-tighter">{title}</h3>
            {sections.map((section, idx) => (
                <div key={idx} className="mb-4">
                    {section.subtitle && (
                        <h4 className="text-lg font-alliance conc tracking-tighter text-left font-semibold mb-2">
                            {section.subtitle}
                        </h4>
                    )}
                    <ul className="list-disc text-left pl-5 list-inside space-y-4">
                        {section.paragraphs.map((para, i) => (
                            <p key={i} className="tracking-tighter">
                                <Markdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[[rehypeKatex]]}
                                >
                                    {para}
                                </Markdown>
                            </p>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderExample = (ex: {
        title: string;
        description?: string;
        steps: string[];
        conclusion?: string;
    }) => (
        <div className="bg-[#1e2914] text-bg px-5 py-4 rounded-lg mb-4 shadow-sm">
            <h4 className="text-xl font-bold mb-2">{ex.title}</h4>
            {ex.description && <p className="mb-3">{ex.description}</p>}

            <div className="pl-4 border-l-2 border-[#a8c7a3] mb-3">
                <b className="block text-sm text-[#a8c7a3] mb-2">Steps:</b>
                <ol className="list-decimal list-inside space-y-1">
                    {ex.steps.map((step, i) => (
                        <li key={i} className="mb-1">
                            <Markdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[[rehypeKatex]]}
                            >
                                {step}
                            </Markdown>
                        </li>
                    ))}
                </ol>
            </div>

            {ex.conclusion && (
                <div className="bg-[#0f1610] px-3 py-2 rounded text-sm mt-2">
                    <b className="">Conclusion:</b>
                    <Markdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[[rehypeKatex]]}
                    >
                        {ex.conclusion}
                    </Markdown>


                </div>
            )}
        </div>
    );

    return (
        <div className="w-full my-20 px-4 flex items-center flex-col">
            <section className="flex max-w-7xl h-[20vh]  justify-end w-full max-sm:px-4 items-start flex-col">
                <b className="text-[16px] tracking-tighter text-bg bg-[#1e2914] p-1 rounded px-2 mb-2">Concept</b>
                <p className="flex tracking-[-5px] font-geist-semibold text-5xl max-sm:max-w-[80vw] text-start w-full max-w-[40vw]">{title}</p>
            </section>
            {/* Definitions */}
            <section className="flex border-t max-w-7xl justify-center w-full max-sm:px-4 items-start flex-col mt-6">
                <h2 className="text-2xl font-bold mb-3 text-bg">Definitions</h2>
                {definitions.map((def, i) => (
                    <div key={i}>{renderDefinition(def)}</div>
                ))}
            </section>

            {/* Explanation */}
            <section className="flex border-t pt-8 max-w-7xl h-auto justify-center w-full max-sm:px-4 items-start flex-col mt-6">
                {renderSection('Explanation', explanation)}
            </section>

            {/* Analogy (if present) */}
            {analogy && analogy.length > 0 && (
                <section className="flex max-w-7xl h-auto justify-center w-full max-sm:px-4 items-start flex-col mt-6">
                    {renderSection('Analogy', analogy)}
                </section>
            )}

            {/* Examples */}
            <section className="flex max-w-7xl h-auto justify-center w-full max-sm:px-4 items-start flex-col mt-6">
                <h2 className="text-2xl font-bold mb-3 text-bg">Examples</h2>
                {examples.map((ex, i) => (
                    <div key={i}>{renderExample(ex)}</div>
                ))}
            </section>

            {/* Misconceptions */}
            {misconceptions.length > 0 && (
                <section className="flex max-w-7xl h-auto justify-center w-full max-sm:px-4 items-start flex-col mt-6">
                    <h2 className="text-2xl font-bold mb-3 text-bg">Common Misconceptions</h2>
                    <ul className="list-disc list-inside space-y-3 text-bg">
                        {misconceptions.map((m, i) => (
                            <li key={i}>
                                <div className="mb-1">
                                    <b className="text-[#a8c7a3]">Misconception:</b>{' '}
                                    {m.misconception}
                                </div>
                                <div className="ml-4 pl-3 border-l-2 border-[#a8c7a3]">
                                    <b className="text-[#a8c7a3]">Correction:</b> {m.correction}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Summary */}
            {summary && (
                <section className="flex max-w-7xl h-auto justify-center w-full max-sm:px-4 items-start flex-col mt-6">
                    <div className="bg-[#0f1610] px-4 py-3 rounded-lg text-bg">
                        <b className="block text-sm text-[#a8c7a3] mb-1">Summary</b>
                        <Markdown
                            remarkPlugins={[remarkGfm,remarkMath]}
                            rehypePlugins={[[rehypeKatex]]}
                        >
                            {summary}
                        </Markdown>
                    </div>
                </section>
            )}
        </div>
    )
}