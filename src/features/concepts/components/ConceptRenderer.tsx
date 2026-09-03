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
                <b className="block  text-left text-[20px] font-anthropic-display-italic tracking-tighter   mb-1">
                    {def.title.replace("CAPS", "")}
                </b>
            )}
            <p className="tracking-tighter font-anthropic-text text-left">
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
    ) => {
        return (
            <section className="flex flex-col border-t pt-8 max-w-7xl mx-auto w-full max-sm:px-4 items-start mt-6">
                {/* 1. The Main Heading */}
                <h3 className="text-[30px] font-anthropic-display font-bold tracking-tighter text-left mb-6 w-full">
                    {title}
                </h3>

                {/* 2. The Content Container */}
                <div className="w-full space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx} className="w-full">
                            {/* Subtitle */}
                            {section.subtitle && (
                                <Markdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {section.subtitle}
                                </Markdown>
                            )}

                            {/* 3. The Paragraphs */}
                            {/* Removed <ul> to prevent layout shifting. Use <p> with spacing directly. */}
                            <div className="space-y-4 text-left leading-relaxed">
                                {section.paragraphs.map((para, i) => (
                                    <p key={i} className="tracking-tighter text-gray-700">
                                        <Markdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {para}
                                        </Markdown>
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const renderExample = (ex: {
        title: string;
        description?: string;
        steps: string[];
        conclusion?: string;
    }) => (
        <div className="bg-[#1e2914] gap-y-4 flex flex-col text-left text-bg px-8 py-8">
            <b className="text-[16px] tracking-tighter self-start bg-bg text-[#1e2914] p-1 rounded px-2 mb-2">Example</b>
            <h4 className="text-xl font-bold font-anthropic-display  mb-2">{ex.title}</h4>
            <div className="font-anthropic-text">
                {ex.description && <Markdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {ex.description}
                </Markdown>}
            </div>

            <div className="pl-4 border-l-2 mb-3">
                <b className="block text-sm  mb-2">Steps:</b>
                <p className="list-decimal list-inside space-y-4">
                    {ex.steps.map((step, i) => (
                        <p key={i} className="mb-1 font-anthropic-text flex">
                            <Markdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[[rehypeKatex]]}
                            >
                                {step}
                            </Markdown>
                        </p>
                    ))}
                </p>
            </div>

            {ex.conclusion && (
                <div className="bg-[#0f1610] font-anthropic-text px-3 py-2 rounded text-sm mt-2">
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
        <div className="w-full my-20 min-h-screen flex items-center flex-col">
            <section className="flex max-w-7xl mt-[30vh]  justify-end w-full max-sm:px-8 items-start flex-col">
                <b className="text-[16px] tracking-tighter text-bg bg-[#1e2914] p-1 rounded px-2 mb-2">Concept</b>
                <p className="flex tracking-[-5px] font-geist-semibold text-5xl max-sm:max-w-[80vw] text-start w-full max-w-[40vw]">{title}</p>
            </section>
            {/* Definitions */}
            <section className="flex border-t max-w-7xl justify-center w-full max-sm:px-8 items-start flex-col mt-6">
                <h2 className="text-2xl font-bold mb-3 text-bg">Definitions</h2>
                {definitions.map((def, i) => (
                    <div key={i}>{renderDefinition(def)}</div>
                ))}
            </section>

            {/* Explanation */}
            <section className="flex border-t pt-8 max-w-7xl h-auto justify-center w-full max-sm:px-8 items-start flex-col mt-6">
                {renderSection('Explanation', explanation)}
            </section>

            {/* Analogy (if present) */}
            {analogy && analogy.length > 0 && (
                <section className="flex max-w-7xl h-auto justify-center w-full max-sm:px-8 items-start flex-col mt-6">
                    {renderSection('Analogy', analogy)}
                </section>
            )}

            {/* Examples */}
            <section className="flex max-w-7xl pt-5 h-auto justify-center w-full  items-start flex-col mt-6">
                {examples.map((ex, i) => (
                    <div className=" rounded-2xl" key={i}>{renderExample(ex)}</div>
                ))}
            </section>

            {/* Misconceptions */}
            {misconceptions.length > 0 && (
                <section className="flex max-w-7xl h-auto justify-center w-full max-sm:px-8 items-start flex-col mt-6">
                    <h2 className="text-[30px] font-bold mb-6 tracking-tighter font-anthropic-display">Common Misconceptions</h2>
                    <ul className="text-left space-y-6 ">
                        {misconceptions.map((m, i) => (
                            <p key={i}>
                                <div className="mb-1">
                                    <b className="font-anthropic-text text-[18px] mb-2 block">Misconception:</b>{' '}
                                    <Markdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {m.misconception}
                                    </Markdown>
                                </div>
                                <div className="ml-4 pl-3 border-l-2 border-[#a8c7a3]">
                                    <b className="font-anthropic-text text-[18px] mb-2 block">Correction:</b>

                                    <Markdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {m.correction}
                                    </Markdown>
                                </div>
                            </p>
                        ))}
                    </ul>
                </section>
            )}

            {/* Summary */}
            {summary && (
                <section className="flex max-w-7xl h-auto justify-center w-full mb-5 items-start flex-col mt-6">
                    <div className="bg-[#0f1610] h-[70vh] px-8 flex flex-col justify-center text-start py-12 text-bg space-y-10">
                        <b className="text-[16px] self-start tracking-tighter text-[#1e2914] bg-bg p-1 rounded px-2 mb-2">Summary</b>
                        <p className="font-anthropic-text text-[18px] text-left">
                            <Markdown
                                remarkPlugins={[remarkGfm,remarkMath]}
                                rehypePlugins={[[rehypeKatex]]}
                            >
                                {summary}
                            </Markdown>
                        </p>
                    </div>
                </section>
            )}
            <p className="font-anthropic-display-italic text-[18px] mb-10">The end</p>
        </div>
    )
}