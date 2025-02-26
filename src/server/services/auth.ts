
import axios from 'axios';

interface GoogleUserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface FacebookUserData {
  id: string;
  email: string;
  name: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export async function verifyGoogleToken(token: string): Promise<GoogleUserData> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { sub, email, name, picture } = response.data;
    return {
      id: sub,
      email,
      name,
      picture,
    };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid Google token');
  }
}

export async function verifyFacebookToken(token: string): Promise<FacebookUserData> {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
    );

    return response.data;
  } catch (error) {
    console.error('Error verifying Facebook token:', error);
    throw new Error('Invalid Facebook token');
  }
}
