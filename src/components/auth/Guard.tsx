import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOW_ERROR_SNACK_MESSAGE } from "../../constants/error";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user])

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOW_ERROR_SNACK_MESSAGE);
    }
  }, [])

  return (
    <>
      {excludedRoutes.includes(path)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
