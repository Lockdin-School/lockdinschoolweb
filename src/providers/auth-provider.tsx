import {Amplify} from 'aws-amplify';
import {Authenticator, useAuthenticator, View} from '@aws-amplify/ui-react';
import {useLocation, useNavigate} from '@tanstack/react-router'
import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";


Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        }
    }
});

const components = {
    SignIn: {
        Header() {
            return (
                <View className={"mt-4 flex flex-col max-sm:items-center items-start "}>
                    <img
                        src="/logo/logo-gw.svg"
                        alt="Lockdin School Logo"
                        className="w-16 h-16 mb-5"
                    />
                    <p className="font-inter text-text text-3xl tracking-tighter py-2">Sign in</p>
                    <p className="text-[14px] tracking-tight font-inter text-[#ODOC22] max-w-xs">Welcome to <b>Lockdin School</b>, quickly sign in and lock in.</p>
                </View>
            )
        },
        Footer() {
            const {toSignUp} = useAuthenticator();
            return (
                <View className={"mt-5 space-y-5"}>
                    <p className="text-xs tracking-tighter text-[#7b7194]">
                        By signing in, you agree to our {" "}
                        <button
                            onClick={() => alert('Terms of Service')}
                            className="text-text underline"
                        >
                            Terms of Service
                        </button> and {" "}
                        <button
                            onClick={() => alert('Privacy Policy')}
                            className="text-text underline"
                        >
                            Privacy Policy
                        </button>
                        .
                    </p>
                    <p className="text-xs tracking-tighter text-[#7b7194]">
                        Don't have an account? {" "}
                        <button
                            onClick={toSignUp}
                            className="text-text hover:underline"
                        >
                            Sign up
                        </button>
                    </p>
                </View>
            )
        }
    },
    SignUp: {
        Header() {
            return (
                <View className={"mt-4 flex flex-col max-sm:items-center items-start "}>
                    <img
                        src="/logo/logo-gw.svg"
                        alt="Lockdin School Logo"
                        className="w-16 h-16 mb-5"
                    />
                    <p className="font-inter text-text text-3xl tracking-tighter py-2">Sign up</p>
                    <p className="text-[14px] tracking-tight font-inter text-[#ODOC22]">Welcome to <b>Lockdin School</b>, create your account and lock in.</p>
                </View>
            )
        },
        Footer() {
            const {toSignIn} = useAuthenticator();
            return (
                <View className={"mt-5 space-y-5"}>
                    <p className="text-xs tracking-tighter text-[#7b7194]">
                        By signing up, you agree to our {" "}
                        <button
                            onClick={() => alert('Terms of Service')}
                            className="text-text underline"
                        >
                            Terms of Service
                        </button> and {" "}
                        <button
                            onClick={() => alert('Privacy Policy')}
                            className="text-text underline"
                        >
                            Privacy Policy
                        </button>
                        .
                    </p>
                    <p className="text-xs tracking-tighter text-[#7b7194]">
                        Already have an account? {" "}
                        <button
                            onClick={toSignIn}
                            className="text-text text-[#0088ff] hover:underline"
                        >
                            Sign in here
                        </button>
                    </p>
                </View>
            )
        }
    }
}

const formFields = {
    signIn: {
        username: {
            label: 'Email',
            placeholder: 'Enter your email',
            isRequired: true,
        },
        password: {
            label: 'Password',
            placeholder: 'Enter your password',
            isRequired: true,
        },
    },
    signUp: {
        username: {
            order: 1,
            label: 'Username',
            placeholder: 'Choose a username',
            isRequired: true,
        },
        email: {
            order: 2,
            label: 'Email',
            placeholder: 'Enter your email address',
            isRequired: true,
        },
        password: {
            order: 3,
            label: 'Password',
            placeholder: 'Create a password',
            isRequired: true,
        },
        confirm_password: {
            order: 4,
            label: 'Confirm Password',
            placeholder: 'Confirm your password',
            isRequired: true,
        }
    }
}

// Define your slides
const SLIDES = [
    {
        id: 2,
        src: '/carousel/green.jpg', // Replace with your image
        caption: 'Advanced Encryption',
    },
    {
        id: 3,
        src: '/carousel/3.jpg', // Replace with your image
        caption: 'Global Protection',
    }
];

const Auth = ({children}: { children: React.ReactNode }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const {user} = useAuthenticator((context) => [context.user]);
    const pathname = useLocation({select: (location) => location.pathname})
    const navigate = useNavigate();

    const isAuthPage = pathname.match(/^\/(signin|signup)$/);
    const isDashboard = pathname.startsWith("/dashboard");

    // Redirect to dashboard if the user is authenticated


    // Variants for a "Push" effect
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%', // Start off-screen right or left
            opacity: 1, // Always 1 to prevent fading
            zIndex: 1,
        }),
        center: {
            x: 0,
            opacity: 1,
            zIndex: 2,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%', // Exit off-screen opposite direction
            opacity: 1,
            zIndex: 1,
        }),
    };

    useEffect(()=> {



        if (!user && isDashboard) {
            navigate({
                to: '/signin',
                replace: true,
            }).then()
        }

        if (user && isAuthPage) {
            navigate({to: '/dashboard'}).then()
        }


        const timer = setInterval(autoAdvance, 6000);
        return () => clearInterval(timer);

    }, [isAuthPage, user, navigate, currentSlide]);


    // Determine slide direction
    const [direction, setDirection] = useState(0);

    // const handleSlideChange = (index: number) => {
    //     setDirection(index > currentSlide ? 0 : -1);
    //     setCurrentSlide(index);
    // };

    const autoAdvance = () => {
        setDirection(1); // Always slide left for auto-advance
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    };

    // Allow access to public pages without authentication
    if (!isAuthPage && !isDashboard) {
        return <>{children}</>;
    }

    useEffect(() => {
        if (!isAuthPage) return;

        const timer = setInterval(autoAdvance, 6000);
        return () => clearInterval(timer);
    }, [isAuthPage, currentSlide]);

    if (!isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f0fff4] text-gray-900">
            {/*<p className="absolute font-getai z-5 text-[#1e2914] text-2xl tracking-[-2px] m-5">*/}
            {/*    Lockdin<sup>®</sup>*/}
            {/*</p>*/}
            <div className="flex relative max-sm:mt-[5vh]  mt-[30vh] w-full items-center justify-center lg:w-1/2">

                <Authenticator
                    components={components}
                    formFields={formFields}
                    initialState={pathname.includes("signup") ? "signUp" : "signIn"}
                >
                    {() => <div />}
                </Authenticator>
                <div className="absolute w-full bottom-20 flex flex-col items-center z-5 ">
                    <p className={"text-[#1e2914] font-getai text-xl tracking-[-2px]"}>
                        Lockdin<sup>®</sup>
                    </p>

                    <b className="font-inter  z-5 text-[#7b7194] text-[12px]">
                        from The Future Academy Inc.
                    </b>
                </div>

            </div>


            <div className="relative hidden  h-full w-full overflow-hidden lg:block lg:w-1/2">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 }, // Smooth spring physics
                            opacity: { duration: 0 } // Instant opacity (no fade)
                        }}
                        className="absolute inset-0 h-full w-full"
                        style={{
                            backgroundImage: `url(${SLIDES[currentSlide].src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                        {/* Caption - Animate separately so it doesn't slide with the image */}
                        <div className="relative z-10 flex h-full flex-col justify-end p-12">
                            {/*<h2*/}
                            {/*    key={currentSlide} // Re-animate caption*/}
                            {/*    className="text-4xl font-bold text-white"*/}
                            {/*>*/}
                            {/*    {SLIDES[currentSlide].caption}*/}
                            {/*</h2>*/}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Indicators */}
                {/*<div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">*/}
                {/*    {SLIDES.map((_, index) => (*/}
                {/*        <button*/}
                {/*            key={index}*/}
                {/*            onClick={() => handleSlideChange(index)}*/}
                {/*            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${*/}
                {/*                currentSlide === index*/}
                {/*                    ? 'w-8 bg-[#00ff11] shadow-[0_0_10px_rgba(0,255,17,0.5)]'*/}
                {/*                    : 'bg-white/40 hover:bg-white/60'*/}
                {/*            }`}*/}
                {/*            aria-label={`Go to slide ${index + 1}`}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>


        </div>
    )
}

export default Auth;