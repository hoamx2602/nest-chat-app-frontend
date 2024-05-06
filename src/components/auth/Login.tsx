import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { LoginRequest, useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  const handleLogin = async (request: LoginRequest) => {
    await login(request);
  };
  return (
    <Auth
      submitLabel="Login"
      onSubmit={handleLogin}
    >
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>SignUp</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
