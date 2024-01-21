"use client"

import { useEffect, useState } from "react";
import Scale from "./Scale";
import NavBar from "./NavBar";
import Image from "next/image";
import { generateScales } from "../components/algo.js";

interface Item {
    weight: number;
    name: string;
    image?: string;
}

interface ItemGroup  {
    items: Item[];
    weight: number;
}

interface ScaleOutput {
    left: string[];
    right: string[];
    op: string;
}

function generateAlphabetArray(n: number): string[] {
    if (n < 1 || n > 26) {
        throw new Error("Invalid input: n should be between 1 and 26.");
    }

    const alphabetArray: string[] = [];
    for (let i = 0; i < n; i++) {
        // ASCII value for 'a' is 97
        const char = String.fromCharCode(97 + i);
        alphabetArray.push(char);
    }
    return alphabetArray;
}

export default function GameScreen() {

    const [scaleOutput, setScaleOutput] = useState<ScaleOutput[]>([])
    const [answer, setAnswer] = useState<string>("")
    const [hasFinished, setHasFinished] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [noOfCorrect, setNoOfCorrect] = useState<number>(0)
    const items = generateAlphabetArray((noOfCorrect)/5 + 2)



    const [time, setTime] = useState(60 * 1000);
    const [isActive, setIsActive] = useState(false);
    

    useEffect(() => {
        let interval : any = null;

        if (isActive) {
            // Update the timer every 10 milliseconds
            interval = setInterval(() => {
                setTime(time => time - 10);
            }, 10);
        } else if (!isActive && time !== 0) {
            // Clear the interval if the timer is paused
            clearInterval(interval);
        }

        if (time <= 0) {
            setHasFinished(true)
            clearInterval(interval)
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
    
    const handleAnswer = async (ansinput : string) => {
        if (ansinput == answer){
            setIsCorrect(true)
            setNoOfCorrect(noOfCorrect + 1)
        } else {
            setIsCorrect(false)
        }
        await waitFor(500);
        handleRestart()
    }

    const handleRestart = () => {
        // setScaleOutput(generateScales(noOfCorrect+2) as ScaleOutput[])
        setIsCorrect(null)
        const scales = generateScales((noOfCorrect)/5 + 2)
        if (scales && scales.length > 0) {
            setAnswer(scales[0].toString());
        }
        // first is answer, everything else is Scale[]
        const scaleOutput : ScaleOutput[] = []
        if (scales) {
            for (let i = 1; i < scales.length; i++) {
                scaleOutput.push(scales[i] as ScaleOutput)
            }
            setScaleOutput(scaleOutput)
        }
    }

    const handleActualRestart = () => {
        setNoOfCorrect(0)
        handleRestart()
        setTime(60 * 1000)
        setHasFinished(false)

    }

    useEffect(() => {
        toggle()
        const scales = generateScales((noOfCorrect)/5 + 2)
        if (scales && scales.length > 0) {
            setAnswer(scales[0].toString());
        }
        // first is answer, everything else is Scale[]
        const scaleOutput : ScaleOutput[] = []
        if (scales) {
            for (let i = 1; i < scales.length; i++) {
                scaleOutput.push(scales[i] as ScaleOutput)
            }
            setScaleOutput(scaleOutput)
        }

        console.log(answer, scaleOutput)
        
        

    }, [])

    const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))

    if (isCorrect === true) {
        return (
            <main className="flex flex-col h-screen w-screen bg-green-600 items-center text-white gap-4">
                <NavBar />
                <div className="flex flex-col h-full items-center justify-center">
                    <h1 className="text-6xl font-bold text-center">
                        Correct!
                    </h1>
                </div>

            </main>
        )
    }

    if (isCorrect === false) {
        return (
            <main className="flex flex-col h-screen w-screen bg-red-600 items-center text-white gap-4">
                <NavBar />
                <div className="flex flex-col h-full items-center justify-center">
                    <h1 className="text-6xl font-bold text-center">
                        Incorrect!
                    </h1>
                </div>

            </main>
        )
    }

    if (hasFinished) {
        return (
            <main className="flex flex-col h-screen w-screen bg-white items-center text-black gap-4">
                <NavBar />
                <div className="flex flex-col h-full items-center justify-center">
                    <h1 className="text-6xl font-bold text-center">
                        Game Over!
                    </h1>

                    <h2 className="text-4xl font-bold text-center">
                        You got {noOfCorrect} correct!
                    </h2>

                    <button 
                        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => handleActualRestart()}>
                        Restart
                    </button>


                </div>

            </main>
        )
    }


    return (
        <main className="flex flex-col h-screen w-screen bg-white justify-between text-black gap-4">
            <NavBar />
            <h1 className="text-2xl font-bold absolute top-[90px] left-[20px] self-start">
                {displayTime()}
            </h1>
            <div className={`
                grid grid-rows-2 grid-flow-col absolute ml-8 gap-16 top-[90px] 
                ${((noOfCorrect)/5 + 2) < 4 ? "right-[610px]" : ""}
                ${((noOfCorrect)/5 + 2) < 8 ? "right-[400px]" : ""} 
                ${((noOfCorrect)/5 + 2) < 10 ? "right-[200px]" : ""}
                `}>

                {scaleOutput.map((scale, index) => (
                    <div key={scale.left.join("") + scale.right.join("") + index}>
                        <Scale left={scale.left} right={scale.right} op={scale.op} />
                    </div>
                ))}
            </div>


            <div className="flex flex-col items-center justify-center mt-32">

                <div className="grid grid-rows-1 grid-flow-col gap-2 mt-16 mb-8">
                   {items.map((item, index) => (
                       <div key={index} className="flex flex-col items-center justify-center">  
                            <button
                                className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-4 px-8 rounded"
                                onClick={() => handleAnswer(item)}
                            >
                                <Image src={`/${item}.png`} alt="Scale" width={32} height={32} />
                                {/* <img src={`/${item}.png`} alt="Scale" /> */}
                            </button>


                        </div>
                     ))}
                    

                </div>
            </div>

        </main>
    )
}