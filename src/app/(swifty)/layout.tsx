'use client';
import { useAuth } from '@/context/auth-provider';
import axiosClient from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { mapUser } from '@/utilities/map-user';
import { useEffect } from 'react';

export default function Layout({ children }: any) {
  const { user, setUser } = useAuth();
  useEffect(() => {
    if (!user) {
      BrowserAPI.getAccessToken().then((res) => {
        if (res) {
          axiosClient.setToken(res);
          axiosClient.getUser().then((res) => {
            console.log('user:', res.data);
            const user = mapUser(res.data);
            setUser(user);
          });
        }
      });
    }
  }, []);

  return <>{children}</>;
}
