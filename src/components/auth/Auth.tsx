import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credetials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
  extraFields?: React.ReactNode
}

const Auth = ({ submitLabel, onSubmit, children, error, extraFields }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: 360,
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event?.target.value)}
        error={!!error}
        helperText={error}
      />
      {
        extraFields
      }
      <TextField
        type="password"
        label="password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event?.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
