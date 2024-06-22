'use client'

const Dashboard = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">You are logged in</h1>
      <button
       
        className="p-2 mt-4 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;