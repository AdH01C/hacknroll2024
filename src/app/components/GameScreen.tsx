"use client"

import { useEffect, useState } from "react";
import Scale from "./Scale";
import NavBar from "./NavBar";

interface Item {
    weight: number;
    name: string;
    image?: string;
}

interface ItemGroup  {
    items: Item[];
    weight: number;
}


export default function GameScreen() {
    const [items, setItems] = useState<Item[]>([{ weight: 1, name: "Item A" }, { weight: 2, name: "Item B" }, { weight: 3, name: "Item C" }, { weight: 4, name: "Item D" }, { weight: 5, name: "Item E" }, { weight: 6, name: "Item F" }, { weight: 7, name: "Item G" }, { weight: 8, name: "Item H" }, { weight: 9, name: "Item I" }, { weight: 10, name: "Item J" }])
    const [maxWeight, setMaxWeight] = useState<number>(items.map((item) => item.weight).reduce((a, b) => Math.max(a, b)))

    const [itemGroups, setItemGroups] = useState<ItemGroup[]>([
        { items: [items[0], items[1], items[2]], weight: items[0].weight + items[1].weight + items[2].weight },
        { items: [items[3], items[4], items[5]], weight: items[3].weight + items[4].weight + items[5].weight },
        { items: [items[6], items[7], items[8]], weight: items[6].weight + items[7].weight + items[8].weight },
        { items: [items[9]], weight: items[9].weight },
        
    ])


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
    
    const handleAnswer = async (answer : Item) => {
        setIsCorrect(answer.weight == maxWeight)
        await waitFor(500);
        handleRestart()
    }

    const handleRestart = () => {
        // randomise the weights for each item
        setItems(items.map((item) => ({ ...item, weight: Math.floor(Math.random() * 10) + 1 })))

        // new max weight
        setMaxWeight(items.map((item) => item.weight).reduce((a, b) => Math.max(a, b)))

        setIsCorrect(null)
    }

    useEffect(() => {
        toggle()
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

    return (
        <main className="flex flex-col h-screen w-screen bg-white justify-between text-black gap-4">
            <NavBar />
            <h1 className="text-6xl font-bold text-center">
                {displayTime()}
            </h1>
            <div className="flex items-center justify-center">
                {itemGroups.map((itemGroup, index) => (
                    index % 2 === 0 && itemGroups[index + 1] ?
                        <div key={index}>
                            <Scale itemA={itemGroup} itemB={itemGroups[index + 1]} />
                        </div>
                    : null
                ))}
            </div>


            <div className="flex flex-col items-center justify-center mt-32">
                <h1 className="text-6xl font-bold text-center">
                    Which item is heavier?
                </h1>

                <div className="grid grid-rows-2 grid-flow-col gap-4 mt-8 mb-8">
                   {items.map((item, index) => (
                       <div key={index} className="flex flex-col items-center justify-center">  
                            <button
                                className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleAnswer(item)}
                            >
                                {item.name}
                            </button>
                        </div>
                     ))}
                    

                </div>
            </div>

        </main>
    )
}