"use client"

import { useEffect, useState } from "react";
import Scale from "./Scale";

interface Item {
    weight: number;
    name: string;
    image?: string;
}


export default function GameScreen() {
    const [ItemA, setItemA] = useState<Item>({ weight: 5, name: "Item A" })
    const [ItemB, setItemB] = useState<Item>({ weight: 10, name: "Item B" })
    

    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const [time, setTime] = useState(60000);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval : any = null;

        if (isActive) {
            // Update the timer every 10 milliseconds
            interval = setInterval(() => {
                setTime(time => time - 10);
            }, 10);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setTime(0);
        setIsActive(false);
    };

    // Convert time to a format with seconds and milliseconds
    const displayTime = () => {
        const milliseconds = time % 1000;
        const seconds = Math.floor(time / 1000);

        return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
    };
    
    const handleAnswer = async (answer : boolean | null) => {
        if (answer === true && ItemA.weight > ItemB.weight) {
            setIsCorrect(true)
            await waitFor(500);
            handleRestart()

        } else if (answer === false && ItemB.weight > ItemA.weight) {
            setIsCorrect(true)
            await waitFor(500);
            handleRestart()

        } else if (answer === null && ItemA.weight === ItemB.weight) {
            setIsCorrect(true)
            await waitFor(500);
            handleRestart()
        
        } else {
            setIsCorrect(false)
            await waitFor(500);
            handleRestart()
        }
    }

    const handleRestart = () => {
        const randomWeightA = Math.floor(Math.random() * 10) + 1
        const randomWeightB = Math.floor(Math.random() * 10) + 1

        setItemA({ weight: randomWeightA, name: "Item A" })
        setItemB({ weight: randomWeightB, name: "Item B" })

        setIsCorrect(null)
    }

    useEffect(() => {
        toggle()
    }, [])

    const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))

    if (isCorrect === true) {
        return (
            <main className="flex flex-col max-h-screen w-screen bg-white justify-between text-black gap-4">
                <div className="flex flex-col items-center justify-center mt-32">
                    <h1 className="text-6xl font-bold text-center">
                        Correct!
                    </h1>
                </div>

            </main>
        )
    }

    if (isCorrect === false) {
        return (
            <main className="flex flex-col max-h-screen w-screen bg-white justify-between text-black gap-4">
                <div className="flex flex-col items-center justify-center mt-32">
                    <h1 className="text-6xl font-bold text-center">
                        Incorrect!
                    </h1>
                </div>

            </main>
        )
    }

    return (
        <main className="flex flex-col max-h-screen w-screen bg-white justify-between text-black gap-4">
            <h1 className="text-6xl font-bold text-center">
                {displayTime()}
            </h1>
            <div className="flex items-center justify-center">
                <Scale itemA={ItemA} itemB={ItemB} />
            </div>

            <div className="flex flex-col items-center justify-center mt-32">
                <h1 className="text-6xl font-bold text-center">
                    Which item is heavier?
                </h1>

                <div className="flex mt-8">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-16 rounded"
                        onClick={() => handleAnswer(true)}
                    >
                        Item A
                    </button>

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-8 px-16 rounded ml-4"
                        onClick={() => handleAnswer(false)}
                    >
                        Item B
                    </button>

                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-8 px-16 rounded ml-4"
                        onClick={() => handleAnswer(null)}
                    >
                        Equal
                    </button>

                </div>
            </div>

        </main>
    )
}