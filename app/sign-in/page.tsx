import { SignIn } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className=' h-full flex justify-center items-center'>
      <SignIn/>
    </div>
  )
}

export default Page