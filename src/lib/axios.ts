import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { IAuthRequest } from '@/types/IAuthRequest';
import { ITokenResponse } from '@/types/ITokenResponse';
import { IIntraUser } from '@/types/IIntraUser';
import BrowserAPI from './browser.api';

class AxiosClient {
  private readonly instance: Axios;
  private readonly authInfo: Omit<IAuthRequest, 'code'>;
  private token: string | undefined;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_INTRA_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.authInfo = {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    };
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        if (error.status) {
          BrowserAPI.clearTokens();
          console.log('tokens reset');
        }
        return Promise.reject(error);
      }
    );
  }

  public async Authenticate(
    code: string
  ): Promise<AxiosResponse<ITokenResponse>> {
    return axios.post(process.env.NEXT_PUBLIC_INTRA_AUTH_URL!, {
      ...this.authInfo,
      code,
    });
  }

  public async getUser(): Promise<AxiosResponse<IIntraUser>> {
    if (!this.token) throw new Error('No token available');
    return this.instance.get('/me');
  }

  public setToken(token: string) {
    this.token = token;
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

const axiosClient = new AxiosClient();

export default axiosClient;
