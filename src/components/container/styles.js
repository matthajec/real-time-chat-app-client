import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: ${props => props.ai};
  flex-direction: ${props => props.fd};
  padding: ${props => props.p};
  min-height: ${props => props.mh};
`;