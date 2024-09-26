export enum ETokens {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

class BrowserAPI {
  public static async setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public static async getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  public static async removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  public static async clearLocalStorage() {
    localStorage.clear();
  }

  public static async setAccessToken(token: string) {
    this.setLocalStorageItem(ETokens.ACCESS_TOKEN, token);
  }

  public static async getAccessToken() {
    return this.getLocalStorageItem(ETokens.ACCESS_TOKEN);
  }

  public static async removeAccessToken() {
    this.removeLocalStorageItem(ETokens.ACCESS_TOKEN);
  }

  public static async setRefreshToken(token: string) {
    this.setLocalStorageItem(ETokens.REFRESH_TOKEN, token);
  }

  public static async getRefreshToken() {
    return this.getLocalStorageItem(ETokens.REFRESH_TOKEN);
  }

  public static async removeRefreshToken() {
    this.removeLocalStorageItem(ETokens.REFRESH_TOKEN);
  }

  public static async clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  public static async setTokens(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}

export default BrowserAPI;
