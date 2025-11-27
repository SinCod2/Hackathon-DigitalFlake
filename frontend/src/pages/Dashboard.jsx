import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-4">
            <span className="text-white font-bold text-4xl">D</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">digitalflake</h1>
        <p className="text-xl text-gray-600">Welcome to Digitalflake admin</p>
      </div>
    </div>
  );
};

export default Dashboard;
