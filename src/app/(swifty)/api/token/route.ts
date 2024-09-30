// pages/api/route.ts

import type { NextApiRequest } from 'next';
import { mapUser } from '@/utilities/map-user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = await req.json();
  const { code } = res;
  console.log('code:', code);
  try {
    // First API call to fetch the token
    const tokenResponse = await fetch(process.env.NEXT_PUBLIC_INTRA_AUTH_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: tokenData },
        { status: tokenResponse.status }
      );
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    // Second API call to fetch user data
    const userResponse = await fetch('https://api.intra.42.fr/v2/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: userData },
        { status: userResponse.status }
      );
    }

    // Map the user data if necessary
    const user = mapUser(userData); // Burada mapUser fonksiyonunu tanımlamanız gerekiyor.

    // Return the token and user data to the client
    return NextResponse.json(
      { accessToken, refreshToken, user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}
