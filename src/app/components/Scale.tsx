"use client"

import { use, useEffect, useState } from "react";
import Image from "next/image";

// interface Item {
//     weight: number;
//     name: string;
//     image?: string;
// }

// interface ItemGroup  {
//     items: Item[];
//     weight: number;
// }

// interface ScaleProps {
//     itemA: ItemGroup;
//     itemB: ItemGroup;
// }

interface ScaleProps {
    left: string[];
    right: string[];
    op: string;
}

export default function Scale({ left, right, op }: ScaleProps) {
    const [isHeavier, setIsHeavier] = useState(false)
    const [isEqual, setIsEqual] = useState(false)
    
    useEffect(() => {
        if (op == ">") {
            setIsHeavier(true)
        } else if (op == "=") {
            setIsEqual(true)
        } else {
            setIsHeavier(false)
            setIsEqual(false)
        }
    }, [left, right])

    return (
        <div className="flex flex-col h-64 w-[355px] justify-between">
            <div className="flex justify-between">
                <div className={`h-fit grid grid-rows-2 grid-flow-col ${isHeavier ? "mt-16" : ""} ${isEqual ? "hidden" : ""}`}>
                    {left && left.map((item) => (
                        <h2 className="text-2xl font-bold text-center" key={item}>
                            {item}
                        </h2>
                    ))}
                </div>

                <div className={`h-fit grid grid-rows-2 grid-flow-col ${isHeavier ? "" : "mt-16"} ${isEqual ? "hidden" : ""}`}>
                    {right && right.map((item) => (
                        <h2 className="text-2xl font-bold text-center"  key={item}>
                            {item}
                        </h2>
                    ))}
                </div>

                <div className={`h-fit grid grid-rows-2 grid-flow-col mt-8 ${isEqual ? "" : "hidden"}`}>
                    {left && left.map((item) => (
                        <h2 className="text-2xl font-bold text-center"  key={item}>
                            {item}
                        </h2>
                    ))}
                </div>

                <div className={`h-fit grid grid-rows-2 grid-flow-col mt-8 ${isEqual ? "" : "hidden"}`}>
                    {right && right.map((item) => (
                        <h2 className="text-2xl font-bold text-center"  key={item}>
                            {item}
                        </h2>
                    ))}
                </div>


            </div>
            {isEqual ? (
                <Image src="/flatisjustice.png" alt="Scale" width={355} height={355} className="absolute mt-[107px]"/>
            ) : (
                isHeavier ? (
                    <Image src="/left.png" alt="Scale" width={355} height={355} className="absolute mt-16"/>
                ) : (
                    <Image src="/right.png" alt="Scale" width={355} height={355} className="absolute mt-16" />
                )
            )}
        </div>


    )

}