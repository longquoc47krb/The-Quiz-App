import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { sendResetPassword } from '@/apis/authServices';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isResendEnabled, setIsResendEnabled] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResendClick = () => {
    if (isResendEnabled) {
      // Simulate server request for resend
      setIsResendEnabled(false);
      setTimeout(() => {
        setIsResendEnabled(true);
      }, 30000); // 30 seconds
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendResetPassword(email);
    // Simulate server request for forgot password
    setMessage('Reset password email sent!');
  };

  return (
    <Main meta={<Meta title="Forgot password" description="Forgot password" />}>
      <div className="min-h-screen flex items-start justify-center">
        <div className="item-container w-[40vw]">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Forgot Password
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex items-center gap-x-2">
              <button
                type="submit"
                className="w-full bg-darkPrimary text-white py-2 rounded hover:bg-violet-600 text-center"
              >
                Submit
              </button>
              <button
                onClick={handleResendClick}
                disabled={!isResendEnabled}
                className={`w-full py-2 rounded text-center ${
                  isResendEnabled
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                Resend
              </button>
            </div>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </div>
    </Main>
  );
}
