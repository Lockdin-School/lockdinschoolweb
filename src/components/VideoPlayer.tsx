// video player component for video lectures
"use client"

import React, {useEffect, useRef, useState} from 'react';
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Backward02Icon,
    Forward02Icon,
    MaximizeScreenIcon,
    MinimizeScreenIcon,
    PlayIcon,
    VolumeHighIcon,
    VolumeOffIcon,
} from "@hugeicons/core-free-icons"

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

const VideoPlayer = ({src, poster}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        }
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play().then();
        }
        setIsPlaying(!isPlaying);
    }

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newVolume = parseFloat(e.target.value);
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const progressBar = progressBarRef.current;
        if (!video || !progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * duration;
    }

    const skip = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        const container = videoRef.current?.parentElement;
        if (!container) return;

        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen().then();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then();
            }
        }
        setIsFullscreen(!isFullscreen);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="group rounded relative w-full overflow-hidden  bg-black"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(!isPlaying)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className={"aspect-video h-auto w-full"}
            />

            {/* Fullscreen */}
            <button
                onClick={toggleFullscreen}
                className="text-white absolute right-5 top-5 z-10 bg-black/20 p-2 rounded-sm transition-colors cursor-pointer hover:text-[#ffbb00]"
            >
                {isFullscreen ? (
                    <HugeiconsIcon icon={MinimizeScreenIcon} />
                ) : (
                    <HugeiconsIcon icon={MaximizeScreenIcon} />
                )}
            </button>
            {/*PLAY / PAUSE BUTTON*/}
            <div
                className={`absolute inset-0 flex items-center justify-center gap-x-5 bg-black/30 transition-opacity duration-300 ${
                    showControls && !isPlaying ? "opacity-100" : "opacity-0"
                }`}
                onClick={togglePlay}
            >
                {/* Skip Forward */}
                <button
                    onClick={() => skip(-10)}
                    className="rounded-2xl bg-[#3d3d3d] p-2 text-white transition-colors hover:scale-110"
                >
                    <HugeiconsIcon icon={Backward02Icon} />
                </button>
                <button className="flex h-15 w-15 items-center justify-center rounded-full bg-[#3d3d3d] text-white transition-all hover:scale-110">
                    <HugeiconsIcon icon={PlayIcon} />
                </button>
                {/* Skip Forward */}
                <button
                    onClick={() => skip(10)}
                    className="rounded-2xl bg-[#3d3d3d] p-2 text-white transition-colors hover:scale-110"
                >
                    <HugeiconsIcon icon={Forward02Icon} />
                </button>
            </div>

            <div
                className={`absolute right-0 bottom-0 left-0 m-2 rounded-2xl border-muted-foreground bg-linear-to-t p-2 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                }`}
            >
                {/* Control Buttons */}
                <div className="flex items-center backdrop-blur-2xl justify-between gap-x-4 gap-y-2 max-md:flex-col max-md:items-start">
                    <div className="flex w-fit items-center gap-3">
                        {/* Volume */}
                        <div className="group/volume flex items-center justify-center gap-2 rounded-full bg-black/40 py-2 pl-2">
                            <button
                                onClick={toggleMute}
                                className="transition-colors text-white"
                            >
                                {isMuted || volume === 0 ? (
                                    <HugeiconsIcon icon={VolumeOffIcon} size={20} />
                                ) : (
                                    <HugeiconsIcon icon={VolumeHighIcon} size={20} />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="group-hover/volume w-0 accent-white opacity-0 transition-all group-hover/volume:mr-2 group-hover/volume:w-20 group-hover/volume:opacity-100"
                            />
                        </div>

                        {/* Time */}
                        <div className="flex w-fit justify-center rounded-2xl gap-2 px-2 bg-black/40 px-1 py-1 text-[10px] font-normal tracking-wider text-white">
                            <p>{formatTime(currentTime)} </p> / <p>{formatTime(duration)} </p>
                        </div>
                    </div>
                    <div
                        ref={progressBarRef}
                        className="group/progress h-1.5 w-full cursor-pointer rounded-full bg-muted-foreground"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="relative h-full w-full rounded-full bg-[#ffbb00] transition-all group-hover/progress:h-2"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute top-1/2 right-0 h-3 w-full -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/progress:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideoPlayer;