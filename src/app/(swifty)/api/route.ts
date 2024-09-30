import { NextResponse } from 'next/server';

// To handle a GET request to /api
export async function POST(request: Request) {
  //Get code from request
  console.log('GET request');
  //Return a response
  return NextResponse.json({ '123': '123' }, { status: 200 });
}
