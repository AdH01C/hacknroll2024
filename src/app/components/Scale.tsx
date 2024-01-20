"use client"

import { use, useEffect, useState } from "react";
import Image from "next/image";

interface Item {
    weight: number;
    name: string;
    image?: string;
}

interface ItemGroup  {
    items: Item[];
    weight: number;
}

interface ScaleProps {
    itemA: ItemGroup;
    itemB: ItemGroup;
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
            <div className="flex justify-between">
                <div className={`h-fit flex flex-col items-center justify-center ${isHeavier ? "mt-52" : ""} ${isEqual ? "hidden" : ""}`}>
                    {itemA.items.map((item) => (
                        <h2 className="text-2xl font-bold text-center">
                            {item.name}
                        </h2>
                    ))}
                </div>

                <div className={`h-fit flex flex-col items-center justify-center ${isHeavier ? "" : "mt-52"} ${isEqual ? "hidden" : ""}`}>
                    {itemB.items.map((item) => (
                        <h2 className="text-2xl font-bold text-center">
                            {item.name}
                        </h2>
                    ))}
                </div>

                <div className={`h-fit flex flex-col items-center justify-center mt-32 ${isEqual ? "" : "hidden"}`}>
                    {itemA.items.map((item) => (
                        <h2 className="text-2xl font-bold text-center">
                            {item.name}
                        </h2>
                    ))}
                </div>

                <div className={`h-fit flex flex-col items-center justify-center mt-32 ${isEqual ? "" : "hidden"}`}>
                    {itemB.items.map((item) => (
                        <h2 className="text-2xl font-bold text-center">
                            {item.name}
                        </h2>
                    ))}
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