import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

const useCreateChat = () => { // Example: Updating the cache after a mutation: https://www.apollographql.com/docs/react/caching/cache-interaction/#example-updating-the-cache-after-a-mutation
  return useMutation(createChatDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
            });
            return [...existingChats, newChatRef];
          },
        },
      });
    },
  });
};

export { useCreateChat };
