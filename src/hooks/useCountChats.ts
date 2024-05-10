import { useCallback, useState } from "react";
import { API_URL } from "../constants/url";
import { snackVar } from "../constants/snack";
import { UNKNOW_ERROR_SNACK_MESSAGE } from "../constants/error";
import { commonFetch } from "../utils/fetch";

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await commonFetch(`${API_URL}/chats/count`);
    if (!res.ok) {
      snackVar(UNKNOW_ERROR_SNACK_MESSAGE);
      return;
    }

    setChatsCount(parseInt(await res.text()));
  }, []);

  return { chatsCount, countChats };
};

export { useCountChats };
