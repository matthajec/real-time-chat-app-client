import {
  Container
} from './styles';

function _Container({ p = "0px", fd = "row", ai = "center", jc = "center", mh = "100vh", children, ...restProps }) {
  return (
    <Container
      p={p}
      fd={fd}
      ai={ai}
      jc={jc}
      mh={mh}
      {...restProps}
    >
      {children}
    </Container>
  );
}

export default _Container;