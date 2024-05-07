import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListItem from "./chat-list-item/ChatListItem";
import { useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";

const ChatList = () => {
  const [chatListAddVisible, setAddChatListVisible] = useState(false);
  const { data } = useGetChats();

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
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats.map((chat) => (
            <ChatListItem name={chat.name} />
          ))}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
