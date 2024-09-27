'use client';
import { useAuth } from '@/context/auth-provider';
import axios from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { mapUser } from '@/utilities/map-user';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const { user, setUser } = useAuth();
  const { accessToken, setAccessToken } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(user);
    if (user) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      const code = searchParams.get('code');
      if (!code) window.location.href = process.env.NEXT_PUBLIC_AUTH_URL!;
      else {
        axios.Authenticate(code).then((res) => {
          axios.setToken(res.data.access_token);
          setAccessToken(res.data.access_token);
          BrowserAPI.setTokens(res.data.access_token, res.data.refresh_token);
          axios.getUser().then((res) => {
            const user = mapUser(res.data);
            setUser(user);
            console.log(user);
          });
        });
      }
    }
  }, []);

  return <div>{user?.fullName}</div>;
}
