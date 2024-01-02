import Link from 'next/link'
import React from 'react'

function GameOver() {
  return (
    <>
    <h1>
        Congratulations you have won the game.
        <Link href='/'>Go home.</Link>
    </h1>
    </>
  )
}

export default GameOver