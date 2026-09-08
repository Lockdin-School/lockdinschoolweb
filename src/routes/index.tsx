import {createFileRoute, useNavigate} from '@tanstack/react-router'


export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const navigate = useNavigate();
    return (
        <>
            <header className="w-full flex fixed backdrop-blur-2xl z-10 justify-center border-b border-[#a2a2a2] min-h-[8vh]">
                <div className="flex w-[90vw] sm:w-[80vw] gap-3 sm:gap-4 py-3 items-center">
                    <div className="flex md:max-w-[80vw]  gap-3 md:gap-4 py-2">
                        <img src="/logo/logo-gw.svg" alt="Lockdin Logo" className="w-8 h-8"/>
                    </div>
                    <div className='w-px bg-bg h-8' />
                    <button
                        onClick={()=> { void navigate({ to: '/signup' })}}
                        className="bg-accent font-alliance px-3 rounded sm:px-5 py-2 text-xs text-black border-text whitespace-nowrap">
                        Create account
                    </button>
                </div>
            </header>
            <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-16 sm:py-0 overflow-hidden">
                <img
                    src="/carousel/green.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <section className="relative z-10 flex flex-col items-start gap-3 sm:gap-2 max-w-[90vw] sm:max-w-[80vw]">
                    <p className="text-6xl max-sm:text-left text-white font-alliance-2 sm:text-6xl md:text-8xl tracking-tighter leading-[1.05]">Understand how you learn.</p>
                    <p className="px-px text-base font-alliance text-white sm:text-xl  tracking-tight">Intelligent learning, built around every student.</p>

                    <div className="flex items-center gap-2">
                        {/*<Link to={"/manifesto"} className="text-xs bg-text text-bg hover:underline p-4 py-6 my-10">Read Our Manifesto</Link>*/}
                        <button
                            onClick={()=> { void navigate({ to: '/signin' })}}
                            className="text-lg text-white
                             rounded font-alliance border border-white  hover:underline px-8 py-3 my-8 sm:my-10 bg-transparent backdrop-blur-sm">Sign In</button>
                    </div>
                </section>
            </main>
        </>
    )
}