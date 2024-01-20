"use client"

import { useEffect, useState } from "react";
import Scale from "./Scale";
import NavBar from "./NavBar";

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


export default function GameScreen() {

    const [scaleOutput, setScaleOutput] = useState<ScaleOutput[]>([])

    // const [items, setItems] = useState<Item[]>(
    //     [
    //         { weight: 1, name: "A" }, 
    //         { weight: 2, name: "B" }, 
    //         { weight: 3, name: "C" }, 
    //         { weight: 4, name: "D" }, 
    //         { weight: 5, name: "E" }, 
    //         { weight: 6, name: "F" }, 
    //         { weight: 7, name: "G" }, 
    //         { weight: 8, name: "H" }, 
    //         { weight: 9, name: "I" }, 
    //         { weight: 10, name: "J" }])

    const items = ['a', 'b', 'c', 'd']

    // const [maxWeight, setMaxWeight] = useState<number>(items.map((item) => item.weight).reduce((a, b) => Math.max(a, b)))

    // const [itemGroups, setItemGroups] = useState<ItemGroup[]>([
    //     { items: items.slice(0, 3), weight: items.slice(0, 3).map((item) => item.weight).reduce((a, b) => a + b) },
    //     { items: items.slice(1, 4), weight: items.slice(1, 4).map((item) => item.weight).reduce((a, b) => a + b) },

    //     { items: items.slice(2, 5), weight: items.slice(2, 5).map((item) => item.weight).reduce((a, b) => a + b) },
    //     { items: items.slice(2, 5), weight: items.slice(2, 5).map((item) => item.weight).reduce((a, b) => a + b) },

    //     { items: items.slice(5, 10), weight: items.slice(5, 10).map((item) => item.weight).reduce((a, b) => a + b) },
    //     { items: items.slice(0, 7), weight: items.slice(0, 7).map((item) => item.weight).reduce((a, b) => a + b) },

    // ])

    const [hasFinished, setHasFinished] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [noOfCorrect, setNoOfCorrect] = useState<number>(0)

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
    
    const handleAnswer = async (answer : string) => {
        if (answer == "a"){
            setIsCorrect(true)
            setNoOfCorrect(noOfCorrect + 1)
        }
        await waitFor(500);
        handleRestart()
    }

    const handleRestart = () => {
        setScaleOutput(generateScales(4))
        setIsCorrect(null)
    }

    useEffect(() => {
        toggle()
        setScaleOutput(generateScales(4))

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
            <div className="grid grid-rows-2 grid-flow-col absolute right-1/4 top-[90px]">
                {/* {itemGroups.map((itemGroup, index) => (
                    index % 2 === 0 && itemGroups[index + 1] ?
                        <div key={index}>
                            <Scale itemA={itemGroup} itemB={itemGroups[index + 1]} />
                        </div>
                    : null
                ))} */}

                {scaleOutput.map((scale, index) => (
                    <div key={index}>
                        <Scale left={scale.left} right={scale.right} op={scale.op} />
                    </div>
                ))}
            </div>


            <div className="flex flex-col items-center justify-center mt-32">

                <div className="grid grid-rows-2 grid-flow-col gap-4 mt-8 mb-8">
                   {items.map((item, index) => (
                       <div key={index} className="flex flex-col items-center justify-center">  
                            <button
                                className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleAnswer(item)}
                            >
                                {item}
                            </button>
                        </div>
                     ))}
                    

                </div>
            </div>

        </main>
    )
}