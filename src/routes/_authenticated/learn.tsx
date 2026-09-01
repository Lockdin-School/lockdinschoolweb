import {createFileRoute} from '@tanstack/react-router'
import SubjectHeader from "@/components/headers/SubjectHeader.tsx";

export const Route = createFileRoute('/_authenticated/learn')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="w-full min-h-screen flex flex-col items-stretch">
        <SubjectHeader />
        <main className="mt-20 max-sm:px-4 max-w-7xl w-full">
          <section className="flex flex-col items-start">
            <p className="text-[#636363] text-sm tracking-tighter">
              Subjects
            </p>

          </section>
        </main>
      </div>
  )
}
