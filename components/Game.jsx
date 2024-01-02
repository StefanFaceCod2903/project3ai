'use client'
import React from 'react'
import Board from '@components/Board'
import GameOver from '@components/GameOver';
import { useState } from 'react';

function Game({letters}) {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [isDelayed, setIsDelayed] = useState(false);
    function getNextLevel() {
        setCurrentLevel(currentLevel + 1);  
        setIsDelayed(true)
        setTimeout(() => {
            setIsDelayed(false);
          }, 500);
        console.log(currentLevel);
    }
    return isDelayed ? 
            <p>Loading ...</p>
        : currentLevel < Object.keys(letters).length ? (
        <div>
            <h1>Build the letter {Object.keys(letters)[currentLevel]}</h1>
            <Board letter={letters[Object.keys(letters)[currentLevel]]} proceed={getNextLevel}/>
        </div>
    ) : (
        <>
            <GameOver/>
        </>
    )
}

export default Game