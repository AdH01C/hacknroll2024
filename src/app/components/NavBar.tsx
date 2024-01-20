"use client"

import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';
import { SoundFilled, PauseOutlined } from "@ant-design/icons";

export default function NavBar() {
    const [isPlaying, setIsPlaying] = useState(true)

    const sound = new Howl({
        src: ['/bgm.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.5,
        onend: () => {
            console.log('Finished playing');
        }
        });

    const handlePlay = () => {
        if (isPlaying) {
            sound.pause();
            setIsPlaying(false)
        } else {
            sound.play();
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        sound.play();
        return () => {
            sound.stop()
        }
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