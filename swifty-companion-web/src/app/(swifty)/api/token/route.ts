import { NextResponse } from 'next/server';
import axiosClient from '@/lib/axios';
import axios from 'axios';

export async function POST(req: Request) {
  const res = await req.json();
  const { code } = res;

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post(
      process.env.NEXT_PUBLIC_INTRA_AUTH_URL!,
      {
        ...axiosClient.authInfo,
        code,
      }
    );
    return NextResponse.json(tokenResponse.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.response.data, { status: 400 });
  }
}
