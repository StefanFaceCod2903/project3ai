'use client'

import React, { useState } from 'react'
import '../styles/board.css'
import { useRef, useEffect } from 'react';
import '@utils/canvasUtils';
import { renderLines, rotate} from '@utils/canvasUtils';

function BotBoard({ letter, rotations }) {

    const canvasRef = useRef(null);

    const [letterData, setLetterData] = useState(letter);

    const [showRotations, setShowRotations] = useState(false);


    function reRenderLines(newData) {
        setLetterData(newData);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width / 2;
        const height = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        renderLines(letterData, ctx, width, height);

    }
    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width / 2;
        const height = canvas.height / 2;

        renderLines(letterData, ctx, width, height);

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [letterData]);
    const solveLetter = () => {
        rotations.forEach(element => {
            rotate(letterData, element, reRenderLines)
        });
        setShowRotations(true);
    }
    return (
        <div>
            <canvas ref={canvasRef} id="directionCanvas"></canvas>
            <button onClick={solveLetter}>Solve</button>
            {showRotations && <p>Rotations: {rotations.join(' -> ')}</p>}
        </div>
    )
}

export default BotBoard