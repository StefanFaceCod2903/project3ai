import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import calculateRotations from '@utils/fdUtils';
import BotBoard from '@components/BotBoard';
import readAlphabetData from '@utils/readAlphabetUtils'

async function Page({ params }) {
  
    
    const data = await readAlphabetData('letters');

    const possibleLetters = Object.keys(data);

    if(!possibleLetters.includes(params.letter)) {
      return notFound();
    }

  
    const rotations = await calculateRotations(params.letter);

    const letterNumber = possibleLetters.indexOf(params.letter);
  return (
    <>
    <h1>Solve letter {params.letter}</h1>
    <BotBoard letter={data[params.letter]} rotations={rotations}/>
    {letterNumber !== possibleLetters.length - 1 ? <Link href={"/bot/" + possibleLetters[letterNumber+1]}>Next letter</Link> : null}
    <br/>
    {letterNumber !== 0 ? <Link href={"/bot/" + possibleLetters[letterNumber-1]}>Pervious letter</Link> : null}
    </>
  )
}

export default Page