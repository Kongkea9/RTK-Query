import { useState } from "react";
import { useLazyVerifyEmailQuery } from "../../features/auth/authSlice";


export default function VerifyEmailForm() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [verifyEmail, { isFetching }] = useLazyVerifyEmailQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Please enter the token.");
      return;
    }

    setMessage("");

    try {
      await verifyEmail(token).unwrap();
      setMessage("Email verified successfully!");
    } catch (error) {
      const errMsg = error?.data?.message || "Verification failed";
      setMessage(`Verification failed: ${errMsg}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Verification Token:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your verification token"
          required
        />
      </label>
      <button type="submit" disabled={isFetching}>
        {isFetching ? "Verifying..." : "Verify Email"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
