import { useCallback, useState } from "react";
import { API_URL } from "../constants/url";
import { snackVar } from "../constants/snack";
import { UNKNOW_ERROR_SNACK_MESSAGE } from "../constants/error";
import { commonFetch } from "../utils/fetch";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await commonFetch(`${API_URL}/messages/count?chatId=${chatId}`);
    if (!res.ok) {
      snackVar(UNKNOW_ERROR_SNACK_MESSAGE);
      return;
    }

    const { messages } = await res.json();
    setMessagesCount(messages);
  }, [chatId]);

  return { countMessages, messagesCount };
};

export { useCountMessages };
