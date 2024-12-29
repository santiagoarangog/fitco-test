import styled from "styled-components";
import { theme } from "../../styles/theme";

export const WrapperLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  background: ${theme.colors.light} 0% 0% no-repeat padding-box;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 196px;
  width: 196px;
  height: 100%;
  background: ${theme.colors.blue} 0% 0% no-repeat padding-box;
  opacity: 1;
  padding: 47px 24px;
`;

export const WrapperColRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  opacity: 1;
  padding: 0 64px 0 32px;
`;

export const WrapperContent = styled.div`
  display: flex;
  height: calc(100vh - 120px);
  width: 100%;
  opacity: 1;
`;

export const WrapperOptions = styled.div`
  display: flex;
  align-items: center;
  width: 148px;
  height: 40px;
  gap: 4px;
  background: ${theme.colors.green} 0% 0% no-repeat padding-box;
  border-radius: 20px;
  padding: 0 8px;
  opacity: 1;
  cursor: pointer;
`;

export const WrapperNoti = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  opacity: 1;
`;

export const WrapperName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.blue} 0% 0% no-repeat padding-box;
  opacity: 1;

  font-weight: ${theme.fonts.weight.semibold};
  color: ${theme.colors.green};
  font-size: ${theme.fonts.size.default};
`;

export const WrapperMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 6px #00000010;
  opacity: 1;
  cursor: pointer;
`;