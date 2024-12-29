import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${theme.colors.red};
`;
