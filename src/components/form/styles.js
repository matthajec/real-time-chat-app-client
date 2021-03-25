import styled from 'styled-components';

export const Container = styled.form`
  background-color: ${props => props.theme.colors.light};
  width: 550px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;

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

  top: ${props => props.value !== '' ? '15px' : '50%'};
`;

export const InputBox = styled.input`
  position: absolute;
  width: 100%;
  top: 32%;
  height: 60%;
  padding: 0 20px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: ${props => props.theme.font.size.md};

  &:focus ~ ${InputLabel} {
   top: 15px;
  }
`;

export const InputWrapper = styled.div`
  border-radius: 10px;
  border: ${props => !props.error ? `1px solid black` : `2px solid ${props.theme.colors.error}`};
  background-color: ${props => props.theme.colors.white};
  height: 55px;
  width: 100%;
  position: relative;

`;

export const Submit = styled.button`
  height: 55px;
  width: 100%;
  margin-top: 10px;

  border-radius: 10px;
  border: none;
  background-color: ${props => props.theme.colors.white};
  outline: none;
  border-bottom: 4px solid ${props => props.theme.colors.lightgrey};
  cursor: pointer;

  &:active {
    border-bottom: 2px solid ${props => props.theme.colors.lightgrey};;
    margin-top: 12px;
    height: 53px;
  }
`;

export const ErrorMessage = styled.p`
  border-radius: 10px;
  width: 100%;
  margin-top: -17px;
  font-size: ${props => props.theme.font.size.md};
  font-weight: 700;
  color: ${props => props.theme.colors.error};
`;