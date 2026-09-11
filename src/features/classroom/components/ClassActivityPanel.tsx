// ClassActivityPanel.tsx — prop-driven; wire `activity` up to your real quiz-session data
import {ChevronRight, MinusCircle} from "lucide-react";
import type {ClassActivityData} from "./LockdinClassroom";

export default function ClassActivityPanel({activity}: {activity: ClassActivityData}) {
    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <span className="text-[13px] text-[#a9a9a9]">Class Activity</span>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MinusCircle size={16} className="text-[#767676]"/>
                        <span className="text-[14px] text-white">
                            Question {activity.questionNumber}
                        </span>
                    </div>
                    <span className="text-[12px] text-[#767676]">
                        {activity.answeredCount} / {activity.totalCount} answered
                    </span>
                </div>

                <p className="text-[14px] text-[#dcdcdc]">{activity.prompt}</p>

                <div className="flex flex-col gap-1.5">
                    <div className="w-full h-1.5 rounded-full bg-[#2a2b2c] overflow-hidden">
                        <div
                            className="h-full bg-[#8AF0B0]"
                            style={{width: `${activity.correctPercentage}%`}}
                        />
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#8AF0B0]">{activity.correctPercentage}% correct</span>
                    </div>
                </div>
            </div>

            <button className="flex items-center justify-between text-[13px] text-[#a9a9a9] hover:text-white transition-colors pt-2 border-t border-white/10 mt-2">
                View results
                <ChevronRight size={14}/>
            </button>
        </div>
    );
}