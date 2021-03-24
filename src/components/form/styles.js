import styled from 'styled-components';

export const Container = styled.form`
  background-color: ${props => props.theme.colors.light};
  width: 550px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  & * {
    margin-bottom: 20px;
  }

  & *:last-child {
    margin-bottom: 0px;
  }
`;

export const Title = styled.h1``;

export const InputLabel = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  pointer-events: none;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.grey};
  transition: top .2s ease;
  font-size: ${props => props.theme.font.size.sm_md};
`;

export const InputBox = styled.input`
  position: absolute;
  width: 100%;
  top: 32%;
  height: 60%;
  background-color: blue;
  padding: 0 20px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: ${props => props.theme.font.size.md};

  &:valid ~ ${InputLabel},
  &:focus ~ ${InputLabel} {
   top: 15px;
  }
`;

export const InputWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.dark};
  background-color: ${props => props.theme.colors.white};
  height: 55px;
  width: 100%;
  position: relative;
`;

export const Submit = styled.button`
  height: 55px;
  width: 100%;
`;

export const ErrorMessage = styled.p`
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
  font-size: ${props => props.theme.font.size.sm_md};
  border: 1px solid #B32A15;
  background-color: #DBB3AD;
  color: #B32A15;
`;