import {
  Container
} from './styles';

function _Container({ children, ...restProps }) {
  return (
    <Container {...restProps}>{children}</Container>
  );
}

export default _Container;