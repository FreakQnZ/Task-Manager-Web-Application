import { SignUp } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className=' h-full flex justify-center items-center'>
      <SignUp/>
    </div>
  )
}

export default Page