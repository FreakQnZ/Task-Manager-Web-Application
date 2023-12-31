import { user } from "../../utils/database/models/model";
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/utils/database/connect';

export async function POST(request) {
  await connectDB();

  try {
    const { userId, taskId } = await request.json();

    if (!userId || !taskId) {
      return NextResponse.json({
        error: 'userId and taskId are required in the request body',
      });
    }

    const updatedUser = await user.findOneAndUpdate(
      { userId },
      { $pull: { tasks: { _id: taskId } } }
    );

    if (!updatedUser) {
      return NextResponse.json({
        error: 'User or task not found',
      });
    }

    return NextResponse.json({
      successDelete: true
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.error();
  }
}