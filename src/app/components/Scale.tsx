"use client"

import { use, useEffect, useState } from "react";
import Image from "next/image";

export interface Item {
    weight: number;
    name: string;
    image?: string;
}

interface ScaleProps {
    itemA: Item;
    itemB: Item;
}

export default function Scale({ itemA, itemB }: ScaleProps) {
    const [isHeavier, setIsHeavier] = useState(false)
    const [isEqual, setIsEqual] = useState(false)
    
    useEffect(() => {
        if (itemA.weight > itemB.weight) {
            setIsHeavier(true)
        } else if (itemA.weight === itemB.weight) {
            setIsEqual(true)
        } else {
            setIsHeavier(false)
            setIsEqual(false)
        }
    }, [itemA, itemB])

    return (
        <div className="flex flex-col h-64 w-[355px] justify-between">
            <div className="flex justify-between border-4 border-red-900">
                <div className={`h-fit flex flex-col items-center justify-center ${isHeavier ? "mt-52" : ""} ${isEqual ? "hidden" : ""}`}>
                    <h2 className="text-2xl font-bold text-center">
                        {itemA.name} - {itemA.weight}
                    </h2>
                    <img src={itemA.image} alt="Item A" />
                </div>

                <div className={`h-fit flex flex-col items-center justify-center ${isHeavier ? "" : "mt-52"} ${isEqual ? "hidden" : ""}`}>
                    <h2 className="text-2xl font-bold text-center">
                        {itemB.name} - {itemB.weight}
                    </h2>
                    <img src={itemB.image} alt="Item B" />
                </div>

                <div className={`h-fit flex flex-col items-center justify-center mt-32 ${isEqual ? "" : "hidden"}`}>
                    <h2 className="text-2xl font-bold text-center">
                        {itemA.name} - {itemA.weight}
                    </h2>
                    <img src={itemA.image} alt="Item A" />
                </div>

                <div className={`h-fit flex flex-col items-center justify-center mt-32 ${isEqual ? "" : "hidden"}`}>
                    <h2 className="text-2xl font-bold text-center">
                        {itemB.name} - {itemB.weight}
                    </h2>
                    <img src={itemB.image} alt="Item B" />
                </div>


            </div>
            {isEqual ? (
                <Image src="/flatisjustice.png" alt="Scale" width={355} height={355} />
            ) : (
                isHeavier ? (
                    <Image src="/left.png" alt="Scale" width={355} height={355} />
                ) : (
                    <Image src="/right.png" alt="Scale" width={355} height={355} />
                )
            )}
        </div>


    )

}