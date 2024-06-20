'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/server';
import { useRouter } from 'next/navigation';

const Dashboard = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [profileComplete, setProfileComplete] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        window.location.href = '/login';
        return;
      } 

      /*const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('id')
        .eq('user_id', data.user.id)
        .single();

      if (memberError && memberError.code !== 'PGRST116') {
        setMessage(`Error fetching member data: ${memberError.message}`);
        return;
      }

      if (memberData) {
        setProfileComplete(true);
      }*/

      setLoading(false);

    };

    if (typeof window !== 'undefined') {
      checkUser();
    }
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/login';
    }
  };

  const handleDeleteAccount = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('No user logged in.');
      return;
    }

    const response = await fetch('/api/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage('Account deleted successfully.');
      window.location.href = '/signin';
    } else {
      setMessage(`Error deleting account: ${result.error}`);
    }
  };


  if (loading) return <div className="flex justify-center items-center h-screen">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div> 
      </div>
    </div>

;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">You are logged in</h1>
      <button
        onClick={handleSignOut}
        className="p-2 mt-4 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Sign Out
      </button>
      {profileComplete ? (
        <button
          onClick={() => router.push('/profile')}
          className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Profile
        </button>
      ) : (
        <button
          onClick={() => router.push('/application-form')}
          className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Complete Your Profile
        </button>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Dashboard;