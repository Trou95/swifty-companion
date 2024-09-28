'use client';
import { useAuth } from '@/context/auth-provider';
import axiosClient from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { ITokenResponse } from '@/types/ITokenResponse';
import { mapUser } from '@/utilities/map-user';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { ReactNode, Suspense, useEffect } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
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
            .catch((error: any) => {
              if (error.isRefresToken) {
                axiosClient
                  .refreshToken()
                  .then((res: AxiosResponse<ITokenResponse>) => {
                    BrowserAPI.setTokens(
                      res.data.access_token,
                      res.data.refresh_token
                    );
                  });
              }
            });
        }
      });
    }
  });

  return <Suspense>{children}</Suspense>;
}
