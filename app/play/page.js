import React from 'react'

import Game from '@components/Game'

import readAlphabetData from '@utils/readAlphabetUtils'
export default async function Page() {
  

  const data = await readAlphabetData('letters')

  return (
    <Game letters={data}/>
  )
}
