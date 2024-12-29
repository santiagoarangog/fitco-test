import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ p }) => p};
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 7px 26px #0000000b;
  border-radius: 15px;
  opacity: 1;
`;

export const WrapperInitials = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: ${theme.colors.blue} 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-bottom: 11px;
`;

export const WrapperTag = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 12px 0px 16px;
  gap: 7px;
  background: ${theme.colors.gray100} 0% 0% no-repeat padding-box;
  border-radius: 20px;
  opacity: 1;
`;

export const WraperImage = styled.div`
  height: 47px;
  width: 264px;
  background: ${({ background }) => `url(${background}) no-repeat`};
  background-position: center center;
  background-size: cover;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
