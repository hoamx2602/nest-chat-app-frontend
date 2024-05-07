import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListItem from "./chat-list-item/ChatListItem";

const ChatList = () => {
  return (
    <Stack>
      <ChatListHeader />
      <Divider/>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </List>
    </Stack>
  );
};

export default ChatList;
