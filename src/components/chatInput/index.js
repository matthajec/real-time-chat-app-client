import {
  Container,
  Input,
  Submit
} from './styles';

function ChatInput({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

ChatInput.Input = function ChatInputInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

ChatInput.Submit = function ChatInputSubmit({ children, ...restProps }) {
  return <Submit type="submit" {...restProps}>{children}</Submit>;
};

export default ChatInput;