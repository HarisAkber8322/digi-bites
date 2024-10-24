import React, { useState } from "react";

interface VerifyOtpProps {
  onSubmit: (otp: string) => void;
}

const VerifyOtpComponent: React.FC<VerifyOtpProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify OTP
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            OTP
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpComponent;
