'use client';
import { useAuth } from '@/context/auth-provider';
//import axios from '@/lib/axios';
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
        fetch(process.env.NEXT_PUBLIC_INTRA_AUTH_URL!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://swifty-companion.vercel.app/login',
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('token', data);
            setAccessToken(data.access_token);
            BrowserAPI.setTokens(data.access_token, data.refresh_token);

            fetch('https://api.intra.42.fr/v2/me', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            })
              .then((response) => response.json())
              .then((userData) => {
                const user = mapUser(userData);
                setUser(user);
              });
          })
          .catch((error) => console.error('Error:', error));
      }
    }
  }, [user]);

  return <div></div>;
}
