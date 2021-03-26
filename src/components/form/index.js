import {
  Container,
  Title,
  InputWrapper,
  InputLabel,
  InputBox,
  Submit,
  ErrorMessage,
  Text,
  TextLink
} from './styles';

function Form({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      {children}
    </Container>
  );
}

Form.Title = function FormTitle({ children, ...restProps }) {
  return (
    <Title {...restProps}>{children}</Title>
  );
};

Form.Input = function FormInput({ error, label, value, ...restProps }) {
  return (
    <InputWrapper error={error}>
      <InputBox {...restProps} />
      <InputLabel value={value}>{label}</InputLabel>
    </InputWrapper>
  );
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return (
    <Submit type="submit" {...restProps}>{children}</Submit>
  );
};

Form.Error = function FormError({ children, ...restProps }) {
  return (
    <ErrorMessage {...restProps}>{children}</ErrorMessage>
  );
};

Form.Text = function FormText({ children, ...restProps }) {
  return (
    <Text {...restProps}>{children}</Text>
  );
};

Form.TextLink = function FormTextLink({ to, children, ...restProps }) {
  return (
    <TextLink to={to} {...restProps}>{children}</TextLink>
  );
};

export default Form;