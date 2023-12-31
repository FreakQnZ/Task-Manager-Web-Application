import { user } from "../../utils/database/models/model"
import { NextResponse } from 'next/server'
import {connectDB} from '@/app/utils/database/connect'

export async function GET(request) {
  await connectDB()

  try {

    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({
        error: 'userId is required in the query parameters',
      })
    }

    const userData = await user.findOne({ userId });

    if (!userData) {
      return NextResponse.json({
        error: 'User not found',
      })
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.error();
  }
}