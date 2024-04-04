import React, { useState } from "react";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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
    setEmail("");
  };
  return (
    <div className="fixed w-full my-24 px-4 py-24 z-[50]">
      <div className="w-[450px] h-[300px] align-middle mx-auto my-auto bg-black/25 text-white rounded-md">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">
              Forgot Password
            </h1>
            <p>
              <label className="block text-gray-300 my-2">
                Enter registered email:
              </label>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <button
              className="bg-primary w-full py-3 my-3 font-semibold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Get Reset Link"}
            </button>
            {error && <div className="error">{error}</div>}
            {success && (
              <div className="success">
                A reset link has been sent to your registered email.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPass;
