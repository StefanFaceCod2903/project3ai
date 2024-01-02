'use client'

import React, { useState } from 'react'
import '../styles/board.css'
import { useRef, useEffect } from 'react';
import '@utils/canvasUtils';
import { renderLines, rotate, isGoodDirection } from '@utils/canvasUtils';

function Board({letter, proceed}) {
    const canvasRef = useRef(null);

    const [letterData, setLetterData] = useState(letter);

    function reRenderLines(newData) {
        setLetterData(newData);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width / 2;
        const height = canvas.height / 2;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        renderLines(letterData, ctx, width, height);

        if(letterData.arms.every(e => isGoodDirection(e,letterData))) {
          proceed();
        }
        
    }
    useEffect(() => {
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width / 2;
        const height = canvas.height / 2;
    
        renderLines(letterData, ctx, width, height);
        // Cleanup: Clear the canvas when the component unmounts
        return () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
      }, []);
    const buttons = Array.from( { length: letterData.arms.length }, (value, index) => index );
  return (  
    <>
    <canvas ref={canvasRef} id="directionCanvas"></canvas>
    <div>
    {
        buttons.map(e => (<button key={e} onClick={() => rotate(letterData, e, reRenderLines)}>Rotate {e}</button>))
    }
    </div>
    </>
  )
}

export default Board