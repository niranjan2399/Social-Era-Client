export const friendOfUser = (conversations, user, fetchedMessages) => {
  const getConversation = conversations.find(
    (conversation) => conversation._id === fetchedMessages.conversationId
  );
  return getConversation.member.find(
    (member) => member !== user._id
  );
};
