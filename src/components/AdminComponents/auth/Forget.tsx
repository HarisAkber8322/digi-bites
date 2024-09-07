import React, { useState } from "react";

interface ForgetPasswordProps {
  onSubmit: (email: string) => void;
}

const ForgetPasswordComponent: React.FC<ForgetPasswordProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordComponent;
