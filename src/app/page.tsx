'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col justify-center items-center gap-2">
      <h2 className="font-bold text-black text-2xl">Swifty Companion</h2>
      <Button
        color="primary"
        onClick={() => {
          push('/login');
        }}
      >
        Login
      </Button>
    </div>
  );
}
