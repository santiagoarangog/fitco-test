import styled from "styled-components";
import { theme } from "../../styles/theme";

export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "48px"};
  height: ${({ height }) => height || "48px"};
  border-radius: 50%;
  background: ${({ background }) => background || theme.colors.light} 0% 0%
    no-repeat padding-box;
  opacity: 1;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: transform 0.5s ease-in-out;

  ${({ rotate }) =>
    rotate &&
    `
  transform: rotate(180deg);
  transition: transform 0.3s ease-in-out;
`}
`;
