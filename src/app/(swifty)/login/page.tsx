'use client';
import { useAuth } from '@/context/auth-provider';
//import axios from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axiosClient from '@/lib/axios';
import { Spinner } from '@nextui-org/spinner';

export default function LoginPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  useEffect(() => {
    if (user) return push('/account');

    const token = localStorage.getItem('access_token');
    if (!token) {
      const code = searchParams.get('code');
      if (!code) {
        push(process.env.NEXT_PUBLIC_AUTH_URL!);
      } else {
        axiosClient
          .Authenticate(code)
          .then((res) => {
            BrowserAPI.setTokens(res.data.access_token, res.data.refresh_token);
            push('/account');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Spinner />
    </div>
  );
}
