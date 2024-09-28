'use client';
import { useAuth } from '@/context/auth-provider';
import axios from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { mapUser } from '@/utilities/map-user';
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
        window.location.href = process.env.NEXT_PUBLIC_AUTH_URL!;
      } else {
        console.log('123');
        axios.Authenticate(code).then((res) => {
          console.log('token', res.data);
          axios.setToken(res.data.access_token);
          setAccessToken(res.data.access_token);
          BrowserAPI.setTokens(res.data.access_token, res.data.refresh_token);
          axios.getUser().then((res) => {
            const user = mapUser(res.data);
            setUser(user);
          });
        });
      }
    }
  }, [user]);

  return <div></div>;
}
