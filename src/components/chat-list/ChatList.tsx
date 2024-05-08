import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListItem from "./chat-list-item/ChatListItem";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";

const ChatList = () => {
  const [chatListAddVisible, setAddChatListVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();

  useMessageCreated({ chatIds: data?.chats.map(chat => chat._id) || [] })

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setAddChatListVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setAddChatListVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats
            .map((chat) => (
              <ChatListItem
                chat={chat}
                selected={chat._id === selectedChatId}
              />
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
