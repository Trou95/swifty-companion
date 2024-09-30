import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const res = await req.json();
  const { refresh_token } = res;

  if (!refresh_token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post(
      process.env.NEXT_PUBLIC_INTRA_AUTH_URL!,
      {
        client_id: process.env.NEXT_PUBLIC_INTRA_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }
    );
    return NextResponse.json(tokenResponse.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.response.data, { status: 400 });
  }
}
