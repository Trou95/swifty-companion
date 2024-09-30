import { NextResponse } from 'next/server';
import axiosClient from '@/lib/axios';

export async function POST(req: Request) {
  const res = await req.json();
  const { access_token } = res;
  try {
    const user = await axiosClient.instance.get('/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return NextResponse.json(user.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.response.data, {
      status: 401,
    });
  }
}
