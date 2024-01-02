import React from 'react'
import Link from 'next/link'

export default function Page() {

  return (
    <>
    <h1>Welcome to Alpha Twist</h1>
    <p>
    <Link href="/play">Play a game</Link>
    </p>
    <Link href="/bot/d">Use the Robot</Link>
    </>
  )
}
