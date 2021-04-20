import {
  Container,
  Message,
  Delete,
  Author
} from './styles';

function ChatMessage({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

ChatMessage.Message = function ChatMessageMessage({ children, ...restProps }) {
  return <Message {...restProps}>{children}</Message>;
};

ChatMessage.Delete = function ChatMessageDelete({ children, ...restProps }) {
  return <Delete {...restProps}>{children}</Delete>;
};

ChatMessage.Author = function ChatMessageAuthor({ children, ...restProps }) {
  return <Author {...restProps}>{children}</Author>;
};

export default ChatMessage;