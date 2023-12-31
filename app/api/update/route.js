import { user } from "../../utils/database/models/model"
import { NextResponse } from 'next/server'
import {connectDB} from '@/app/utils/database/connect'

export async function POST(request) {
  await connectDB();

  try {
    const { userId, taskId, updates } = await request.json();

    if (!userId || !taskId || !updates || typeof updates !== 'object') {
      return NextResponse.json({
        error: 'userId, taskId, and updates (an object) are required in the request body',
      });
    }

    const updateObject = {};
    Object.entries(updates).forEach(([field, value]) => {
      updateObject[`tasks.$.${field}`] = value;
    });

    const updatedUser = await user.findOneAndUpdate(
      { userId, 'tasks._id': taskId },
      { $set: updateObject }
    );

    if (!updatedUser) {
      return NextResponse.json({
        error: 'User or task not found',
      });
    }

    return NextResponse.json({
      successUpdate: true
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.error();
  }
}
