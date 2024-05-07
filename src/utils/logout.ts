import router from "../components/Routes";
import client from "../constants/apollo-client";

export const onLogout = () => {
  client.resetStore();
  router.navigate("/login");
};
