import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const WrapperFilter = styled.div`
  display: flex;
  width: 38px;
  height: 22px;
  gap: 8px;
  border-radius: 6px;
  background: ${({ background }) => background || theme.colors.white};
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center;
  width: 100%;
  height: ${({ height }) => height || "60vh"};
  padding-bottom: 19px;
`;

export const LabelIndicative = styled.div`
  display: flex;
  width: 64px;
  height: 22px;
  background: ${({ background }) => background};
  border: 4px solid;
  border-color: ${({ borde }) => borde};

  @media (max-width: 550px) {
    width: 44px;
    height: 12px;
  }
`;

export const KeyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "165px"};
  radius 10px;
  border 1px;
  padding 16px;
  gap: 9px;
  background: ${theme.colors.gray100};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};

  @media (max-width: 550px) {
    width: 145px;
    height: 65px;
  }
`;

export const CardInvestorProj = styled.div`
  display: flex;
  height: 166px;
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 7px 26px #0000000B;
  border-radius: 15px;
  gap: 16px;
`;

export const WrapperImage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: url(${({ backgImg }) => backgImg}) no-repeat;
  padding: 20px 53px 22px 24px;
`;

export const DashedLine = styled.div`
  width: 330px;
  height: 0px;
  border: 1px dashed ${theme.colors.light};
  margin: 12.5px 0 15.5px 0;  
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid ${theme.colors.light};
  margin: 22.5px 0 15.5px 0;  
  opacity: 1;
`;

export const TransparentScroll = styled.div`
  display: flex;
  flex-direction: column;
  margin: 26px 0 0 0;
  max-height: 620px;
  height: 620px;
  overflow-x: hidden;

  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* Color del scrollbar */
  
  /* WebKit */
  &::-webkit-scrollbar {
    width: 8px; /* Ancho del scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Color del thumb del scrollbar */
    border-radius: 10px; /* Borde redondeado */
  }
`;

export const CardContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const StatusLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 18px;
  border-radius: 0 12px 0 12px;
  background-color: ${({ color }) => color || theme.colors.gray300};
  color: ${({ textColor }) => textColor || theme.colors.black};
`;

export const ToggleContent = styled.div`
  max-height: ${({ isVisible }) => (isVisible ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

export const WrapperModel = styled.div`
  display: flex;
  justify-content: space-between;
  height: 67px;
  width: 100%;
  background: ${theme.colors.light} 0% 0% no-repeat padding-box;
  border: 1px solid ${theme.colors.gray100};
  border-radius: 7px;
  padding: 10px 9px 10px 16px;
`;