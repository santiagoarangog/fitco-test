import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Surface = styled.div`
  padding: ${(props) => props.p};
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 20px #00000014;
  border-radius: ${(props) => props.radius}px;
  margin:${(props) => props.m};
`;
