import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  margin: ${(props) => props.margin || "12px 0 0 0"};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.align};
  ${(props) =>
    props.hasBorder &&
    css`
      border-bottom: 1px solid ${props.theme.colors.gray100};
    `}
  h4 {
    margin-bottom: 0;
  }
`;

export const WrapperIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 0 16px 0;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  opacity: 1;
  border: 1px solid
    ${({ iconBorderColor }) => iconBorderColor || theme.colors.green};
`;
