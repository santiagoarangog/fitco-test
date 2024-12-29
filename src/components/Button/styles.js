import styled, { css } from "styled-components";
import { Button } from "antd";
import { theme } from "../../styles/theme";

const DISABLED_FILLED = css`
  &&[disabled],
  &&[disabled]:hover {
    cursor: not-allowed;
    color: ${theme.colors?.white};
    background-color: ${theme.colors.gray100};
    border-color: transparent;
    box-shadow: none;
  }
`;

export const CustomButton = styled(Button)`
  padding: 0;
  width: ${({ width }) => width || "169px"};
  height: ${({ height }) => height || "45px"};
  background: ${({ background }) => background || theme.colors.green} 0% 0%
    no-repeat padding-box;
  border-radius: ${({ radius }) => radius || "23px"};
  opacity: 1;
  color: ${({ color }) => color || theme.colors.white};
  font-family: ${theme.fonts.family};
  font-size: ${({ size }) => size || theme.fonts.size.sm};
  font-weight: ${({ weight }) => weight || theme.fonts.weight.medium};
  border: 1px solid;
  border-color: ${({ border }) => border || "transparent"};
  margin: ${({ m }) => m || "0 0 0 0"};

  && {
    &.ant-btn-link {
      &:hover {
        color: ${({ color }) => color || theme.colors.white};
      }
    }

    &.ant-btn-default {
      &:hover {
        color: ${({ color }) => color || theme.colors.white};
        border: 1px solid;
        border-color: ${({ border }) => border || "transparent"};
        background: ${({ hBackground }) => hBackground} 0% 0%;
        no-repeat padding-box;
      }
    }
  }

   ${DISABLED_FILLED} 
`;
