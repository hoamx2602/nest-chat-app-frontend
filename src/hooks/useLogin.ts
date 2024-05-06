import { useState } from "react";
import { API_URL } from "../constants/url";
import client from "../constants/apollo-client";

export interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<boolean>(false);

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      setError(true);
      return;
    }

    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
