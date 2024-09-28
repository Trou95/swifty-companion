'use client';
import { useAuth } from '@/context/auth-provider';
import axiosClient from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { mapUser } from '@/utilities/map-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: any) {
  const { user, setUser } = useAuth();
  const { push } = useRouter();
  useEffect(() => {
    BrowserAPI.getAccessToken().then((token) => {
      if (token == null) push('/login');
    });
    if (!user) {
      BrowserAPI.getAccessToken().then((res) => {
        if (res) {
          axiosClient.setToken(res);
          axiosClient
            .getUser()
            .then((res) => {
              const user = mapUser(res.data);
              setUser(user);
            })
            .catch(() => {
              push('/');
            });
        }
      });
    }
  }, []);

  return <>{children}</>;
}
