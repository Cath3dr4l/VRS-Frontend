import { useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPass = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const response = await fetch(`/api/password/reset/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: password,
      }),
    });

    if (!response.ok) {
      let message = "Unknown error";
      try {
        const data = await response.json();
        message = data.message;
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        console.log(response);
      }
      setError(message);
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    setError(null);
    setSuccess(true);
    setIsLoading(false);
    setPassword("");
    setConfirmPassword("");
    setCount(4);
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
    setInterval(() => {
      setCount(count - 1);
    }, 1000);
  };

  return (
    <div className="fixed w-full my-24 px-4 py-24 z-[50]">
      <div className="w-[450px] h-[300px] align-middle mx-auto my-auto bg-black/25 text-white rounded-md">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">
              Reset Password
            </h1>
            <div className="relative">
              <input
                className="p-2 rounded w-full bg-gray-700"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Set New Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                className="absolute top-3 right-3 text-lg cursor-pointer"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <p className="mt-4">
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="password"
                value={confirmPassword}
                placeholder="Confirm New Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </p>
            <button
              className="bg-primary w-full py-3 my-3 font-semibold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Change Password"}
            </button>
            {error && <div className="error">{error}</div>}
            {success && (
              <div className="success">
                <p>Password reset successfully.</p>
                <p>Redirecting to Login Page in {count} seconds.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPass;
