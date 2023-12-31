import { user } from "../../utils/database/models/model"
import { NextResponse } from 'next/server'
import {connectDB} from '@/app/utils/database/connect'

export async function POST(request) {
  try {
    connectDB()
    const { userId, taskTitle, taskDesc, imp, comp, archive } = await request.json()


    const curr_user = await user.findOne({ userId })

    if (!curr_user) {

      await user.create({
        userId,
        tasks: [{ taskTitle, taskDesc, imp, comp, archive }]
      })
    } else {

      await user.findOneAndUpdate({ userId }, {
        $push: { tasks: { taskTitle, taskDesc, imp, comp, archive } }
      })
    }

    return NextResponse.json({
      successnew: true
    })
  } catch (error) {
    console.error("Error in POST request:", error)
    return NextResponse.error()
  }
}
