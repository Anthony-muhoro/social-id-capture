
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import type { SocialAuthResponse } from "@/types/auth";

const Index = () => {
  const [userData, setUserData] = useState<SocialAuthResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      // For testing purposes, we'll use a mock token
      const mockGoogleToken = "mock_google_token";
      const response = await axios.post('http://localhost:3000/api/auth/google', {
        token: mockGoogleToken
      });
      setUserData({ ...response.data, provider: 'google' });
      setIsDialogOpen(true);
      toast.success('Google login successful');
    } catch (error) {
      toast.error('Google login failed');
      console.error('Google login error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // For testing purposes, we'll use a mock token
      const mockFacebookToken = "mock_facebook_token";
      const response = await axios.post('http://localhost:3000/api/auth/facebook', {
        token: mockFacebookToken
      });
      setUserData({ ...response.data, provider: 'facebook' });
      setIsDialogOpen(true);
      toast.success('Facebook login successful');
    } catch (error) {
      toast.error('Facebook login failed');
      console.error('Facebook login error:', error);
    }
  };

  const getProfilePictureUrl = (picture: SocialAuthResponse['picture']) => {
    if (!picture) return '';
    if (typeof picture === 'string') return picture;
    return picture.data?.url || '';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Social Login Test</h1>
        
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            Test Google Login
          </Button>
          
          <Button
            onClick={handleFacebookLogin}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Test Facebook Login
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Data from {userData?.provider}</DialogTitle>
            </DialogHeader>
            {userData && (
              <div className="mt-4 space-y-2">
                <p><strong>ID:</strong> {userData.id}</p>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                {userData.picture && (
                  <div>
                    <strong>Profile Picture:</strong>
                    <img 
                      src={getProfilePictureUrl(userData.picture)}
                      alt="Profile" 
                      className="w-16 h-16 rounded-full mt-2"
                    />
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
