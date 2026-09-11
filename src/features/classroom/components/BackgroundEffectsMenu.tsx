// BackgroundEffectsMenu.tsx
import {Check, Sparkle} from "lucide-react";
import type {BackgroundEffect} from "@/features/classroom/hooks/useBackgroundEffect";

const BLUR_PRESETS = [
    {label: "Light blur", radius: 8},
    {label: "Strong blur", radius: 16},
];

// Swap these for your actual hosted background images.
const IMAGE_PRESETS = [
    {label: "Coffee Shop", url: "/backgrounds/coffee.jpg"},
    {label: "House", url: "/backgrounds/house.jpg"},
    {label: "Penthouse", url: "/backgrounds/penthouse.jpg"},
    {label: "Wall", url: "/backgrounds/wall.jpg"},
];

export default function BackgroundEffectsMenu({
                                                  effect,
                                                  onSelect,
                                              }: {
    effect: BackgroundEffect;
    onSelect: (effect: BackgroundEffect) => void;
}) {
    return (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 rounded-xl border border-white/10 bg-[#141516] p-3 shadow-xl z-20">
            <div className="flex items-center gap-2 px-1 pb-2 text-[12px] text-[#a9a9a9]">
                <Sparkle size={13}/>
                Background effects
            </div>

            <button onClick={() => onSelect({type: "none"})} className={optionClass(effect.type === "none")}>
                None
                {effect.type === "none" && <Check size={13} className="text-[#8AF0B0]"/>}
            </button>

            {BLUR_PRESETS.map((preset) => {
                const active = effect.type === "blur" && effect.radius === preset.radius;
                return (
                    <button
                        key={preset.label}
                        onClick={() => onSelect({type: "blur", radius: preset.radius})}
                        className={optionClass(active)}
                    >
                        {preset.label}
                        {active && <Check size={13} className="text-[#8AF0B0]"/>}
                    </button>
                );
            })}

            <div className="pt-2 mt-1 border-t border-white/10 grid grid-cols-3 gap-2">
                {IMAGE_PRESETS.map((preset) => {
                    const active = effect.type === "image" && effect.url === preset.url;
                    return (
                        <button
                            key={preset.url}
                            onClick={() => onSelect({type: "image", url: preset.url})}
                            className={`relative aspect-square rounded-lg overflow-hidden border ${
                                active ? "border-[#8AF0B0]" : "border-white/10"
                            }`}
                        >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover"/>
                            {active && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <Check size={14} className="text-[#8AF0B0]"/>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function optionClass(active: boolean) {
    return `w-full flex items-center justify-between px-2 py-2 rounded-lg text-[13px] transition-colors ${
        active ? "bg-white/10 text-white" : "text-[#a9a9a9] hover:bg-white/5"
    }`;
}