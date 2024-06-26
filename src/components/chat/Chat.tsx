import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { Message } from "../../gql/graphql";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;

  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });

  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: { content: message, chatId: chatId },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  const sortMessage = (messageA: Message, messageB: Message) =>
    new Date(messageA.createdAt).getTime() -
    new Date(messageB.createdAt).getTime();

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({
              variables: {
                skip: messages?.messages.length,
              },
            })
          }
          hasMore={
            messages && messagesCount
              ? messages?.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {/* Mapping messages */}
          {messages &&
            [...messages.messages].sort(sortMessage).map((message) => (
              <Grid container alignItems="center" marginBottom="1rem">
                <Grid item xs={2} lg={1}>
                  <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      src={message.user.imageUrl}
                      sx={{ width: 52, height: 52 }}
                    />
                    <Typography variant="caption">
                      {message.user.username}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={10} lg={11}>
                  <Stack>
                    <Paper sx={{ width: "fit-content" }}>
                      <Typography sx={{ padding: "0.9rem" }}>
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "0.25rem" }}
                    >
                      {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                      {new Date(message.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
