"use client"

import { useEffect, useState } from "react";
import GameScreen from "./components/GameScreen";
import NavBar from "./components/NavBar";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(3)
  const [showGame, setShowGame] = useState(false)

  const handleRestart = () => {
    setHasStarted(false)
    setSecondsLeft(5)
  }

  const handleStart = () => {
    setHasStarted(true)
  }


  useEffect(() => {
    const timer = setInterval(() => {
        setSecondsLeft(secondsLeft - 1)
    }, 1000)
    
    if (secondsLeft <= 0) {
        clearInterval(timer)
        setShowGame(true)
    }

    return () => clearInterval(timer)

  }, [secondsLeft])

  if (showGame) {
    return <GameScreen />
  }


  return (
    <main className="flex flex-col h-screen bg-white text-black">
      <NavBar />
      <div className="flex h-full flex-col items-center justify-center p-24">
      {!hasStarted ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center">
            Welcome to the weighing scale game!
          </h1>

          <button
            className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleStart()}
          >
            Start
          </button>
          
        </div>

      ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-center">
              {secondsLeft}
            </h2>
            
          </div>
        )} 
      </div>

    </main>
  );
}
