import axios, { Axios, AxiosResponse } from 'axios';
import { IAuthRequest } from '@/types/interfaces/IAuthRequest';
import { ITokenResponse } from '@/types/interfaces/ITokenResponse';
import { IIntraUser } from '@/types/interfaces/IIntraUser';
import BrowserAPI from './browser.api';
import { API_ROUTES } from '@/types/enums/api-routes';

class AxiosClient {
  private readonly _instance: Axios;
  private readonly _authInfo: Omit<IAuthRequest, 'code'>;
  private _token: string | null = null;

  constructor() {
    this._instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_INTRA_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      //withCredentials: true,
    });

    this._authInfo = {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    };

    this._instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: any) {
        if (typeof window === 'undefined') {
          //console.log(error.response);
          if (error.response.status == 401) {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  public async Authenticate(
    code: string
  ): Promise<AxiosResponse<ITokenResponse>> {
    try {
      const tokenResponse = await axios.post(API_ROUTES.TOKEN, {
        code,
      });
      this._token = tokenResponse.data.access_token;
      return tokenResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getUser(): Promise<AxiosResponse<IIntraUser>> {
    try {
      if (!this._token) this._token = await this.getAccessToken();
      return await axios.post(API_ROUTES.ME, {
        access_token: this._token,
      });
    } catch (error: any) {
      error = this.getError(error);
      return Promise.reject(error);
    }
  }

  public async refreshToken() {
    const refreshToken = await BrowserAPI.getRefreshToken();
    return axios.post(API_ROUTES.REFRESH_TOKEN, {
      refresh_token: refreshToken,
    });
  }

  public async getAccessToken() {
    const token = await BrowserAPI.getAccessToken();
    if (token) return token;
    throw new Error('No access token found');
  }

  get instance() {
    return this._instance;
  }

  get authInfo() {
    return this._authInfo;
  }

  private getError(error: any) {
    if (error.response.data.error && error.response.data.message)
      error.response.data.error = error.response.data.message;
    const errorMessage = error.response.data.error;
    error.response.data.code = this.ERROR_CODES.get(errorMessage) || 0;
    return error;
  }

  private readonly ERROR_CODES = new Map<string, number>([
    ['The access token is invalid', 255],
    ['No code provided', 256],
    ['The access token has expired', 257],
    ['The access token was revoked', 258],
  ]);
}

const axiosClient = new AxiosClient();

export default axiosClient;
