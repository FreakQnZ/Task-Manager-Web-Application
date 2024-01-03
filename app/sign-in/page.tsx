import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div className=' h-full flex flex-col justify-center items-center'>
      <div className=' p-4 '>
        <p>Hey user,</p>
        <p>If you are using application for the first time click on <Link className=' underline' href="/sign-up">sign up</Link> <span className=' font-bold text-warning'>(even for google auth)</span></p>
      </div>
      <SignIn/>
    </div>
  )
}

export default Page