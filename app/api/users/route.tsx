// app/api/users/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json({ success: true, data: users });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  try {
    const user = await User.create(body);
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
