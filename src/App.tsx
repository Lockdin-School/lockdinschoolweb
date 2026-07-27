import {Link} from "react-router";

function App() {

  return (
    <>
        <header className="w-full flex justify-center border-b-2 h-[8vh] ">
            <div className="flex w-[80vw] gap-4 py-3 items-center">
                <p className="font-getai text-text text-2xl tracking-tight pt-2">Lockdin<sup>®</sup></p>
                <div className='w-px bg-text h-8' />
                <button className="bg-accent px-5 py-2 text-xs text-black border-text">Create account</button>
            </div>
        </header>
        <main className="h-[80vh] w-full flex flex-col items-center justify-center ">
            <section className="flex flex-col items-start gap-[-20px]">
                <p className="text-8xl tracking-tighter font-geist-semibold">Education reimagined. </p>
                <p className="px-px text-xl tracking-tight">Quality learning, now accessible to all.</p>
                <Link to={"/manifesto"} className="text-xs bg-text text-bg hover:underline p-4 py-6 my-10">Read Our Manifesto</Link>
            </section>

            {/*<Link to={"/dashboard"}>*/}
            {/*    Dashboard*/}
            {/*</Link>*/}
        </main>
    </>
  )
}

export default App
