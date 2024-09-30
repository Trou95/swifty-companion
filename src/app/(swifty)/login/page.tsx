'use client';
import { useAuth } from '@/context/auth-provider';
//import axios from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
//import { mapUser } from '@/utilities/map-user';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { accessToken, setAccessToken, user, setUser } = useAuth();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  useEffect(() => {
    if (user && accessToken) return push('/account');

    const token = localStorage.getItem('access_token');
    if (!token) {
      const code = searchParams.get('code');
      if (!code) {
        console.log(process.env.NEXT_PUBLIC_AUTH_URL);
        push(process.env.NEXT_PUBLIC_AUTH_URL!);
      } else {
        fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('token', data);
            setAccessToken(data.accessToken);
            setUser(data.user);
            BrowserAPI.setTokens(data.accessToken, data.refreshToken);
          })
          .catch((error) => console.error('Error:', error));
      }
    }
  }, [user]);

  return <div></div>;
}
