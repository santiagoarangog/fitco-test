import { theme } from "../../styles/theme";
import styled from "styled-components";

export const CustomStyle = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 9999;
  display: flex;
  z-index: 9999;
  align-items: center;
  width: 1126px;
  height: 65px;
  padding: 12px 30px;
  border-radius: 38px;
  gap: 12px;
  background: ${(props) =>
    props.background || theme.colors.notification.background};
`;
