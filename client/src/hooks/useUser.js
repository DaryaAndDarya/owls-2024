import React, { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "../api/axiosInstance";

export default function useUser() {
  const [user, setUser] = useState({ status: "logging" });
  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: "logged", data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance
      .get("/auth/logout")
      .then(() => setUser({ status: "guest", data: null }));
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password || !formData.name) {
      return alert("Missing required fields");
    }
    axiosInstance
      .post("/auth/signup", formData)
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
        setAccessToken(data.accessToken);
      })
      .catch((error) => alert(error));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert("Missing required fields");
    }
    axiosInstance.post("/auth/login", formData).then(({ data }) => {
      setUser({ status: "logged", data: data.user });
      setAccessToken(data.accessToken);
    });
  };
  return {
    user,
    loginHandler,
    logoutHandler,
    signUpHandler,
  };
}
