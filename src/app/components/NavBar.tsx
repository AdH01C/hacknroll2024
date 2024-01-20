"use client"

import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';
import { SoundFilled, PauseOutlined } from "@ant-design/icons";

const sound = new Howl({
    src: ['/bgm.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5,
});

export default function NavBar() {
    const isPlaying = sound.playing()
    const handlePlay = () => {
        if (isPlaying) {
            sound.pause();
        } else {
            sound.play();
        }
    }
    useEffect(() => {
        if (!isPlaying)
            sound.play();
    }, [])
    return (
        <div className="flex flex-row justify-end sticky w-full bg-blue-500 text-white p-4">
            {isPlaying ? (
                <SoundFilled className="text-2xl" onClick={() => handlePlay()} />
            ): (
                <PauseOutlined className="text-2xl" onClick={() => handlePlay()} />
            )}
        </div>
    )
}
