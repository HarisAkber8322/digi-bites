import React, { useState } from "react";

interface ResetPasswordProps {
  onSubmit: (newPassword: string) => void;
}

const ResetPasswordComponent: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(newPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reset Password
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
