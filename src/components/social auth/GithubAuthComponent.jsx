import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authSlice";

import { useNavigate } from "react-router";
import {
  getDecryptedAccessToken,
  storeAccessToken,
} from "../../util/tokenUtil";

export const useLoginWithGitHub = () => {
  // setup login, popup, logout
  const [error, setError] = useState();
  // pending
  const [pending, setIsPending] = useState(false);
  // data (user credential)
  const [user, setUser] = useState(null);
  // create provider
  const provider = new GithubAuthProvider();

  const [signUpRequest, { error: signUpError }] = useRegisterMutation();

  const [loginRequest, { data }] = useLoginMutation();

  const navigate = useNavigate();

  // useEffect tracking on user credential
  useEffect(() => {
    const unsubriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        throw new Error("unsubscribe user");
      }
    });
    return () => unsubriber();
  }, []);

  // setup login with github
  const loginWithGithub = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("login unsuccessfully");
      }
      const user = res.user.providerData[0];
      console.log("Github Info: ", user);
      const user1 = res.user;
      console.log("Github Info: ", user1);

      //implement signup with api
      try {
        await signUpRequest({
          username: user?.email.substring(0, 4),
          phoneNumber: user?.phoneNumber,
          address: {
            addressLine1: "",
            addressLine2: "",
            road: "",
            linkAddress: "",
          },
          email: user?.email,
          password: `${user?.email.substring(0, 4)}${
            import.meta.env.VITE_SECRET_KEY
          }`,
          confirmPassword: `${user?.email.substring(0, 4)}${
            import.meta.env.VITE_SECRET_KEY
          }`,
          profile: user?.photoURL,
        }).unwrap();

        if (!data) {
          console.log("SignUp Failed");
        }
        console.log("Respone: ", data);
      } catch (error) {
        console.log("=====> error signup : ", error);
        const checkAuth = error.status;
        if (checkAuth == 400 || checkAuth == 200) {
          const loginRespone = await loginRequest({
            email: user?.email,
            password: `${user?.email.substring(0, 4)}${
              import.meta.env.VITE_SECRET_KEY
            }`,
          }).unwrap();

          if (!loginRespone) {
            console.log("Login isn't success");
          }

          console.log("=====> user data after login", loginRespone.accessToken);

          if (loginRespone?.accessToken) {
            storeAccessToken(loginRespone?.accessToken);
            console.log("=====> After Decrypted: ", getDecryptedAccessToken());
            navigate("/products");
          }
          if (!loginRespone?.accessToken) {
            navigate("/login");
          }
        }
      }

      setIsPending(false);
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  //logout features
  const gitHubLogout = async () => {
    setIsPending(false);
    setError(null);
    try {
      await signOut(auth);
      setIsPending(true);
      console.log("Logout successfully!");
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return { gitHubLogout, loginWithGithub, pending, error, user };
};
