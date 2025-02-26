
export interface SocialAuthResponse {
  id: string;
  email: string;
  name: string;
  picture?: string | {
    data: {
      url: string;
    }
  };
  provider: 'google' | 'facebook';
}

export interface TokenRequest {
  token: string;
}
