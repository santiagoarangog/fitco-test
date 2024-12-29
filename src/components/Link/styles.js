import styled from "styled-components";
import { Button } from "antd";
import { theme } from "../../styles/theme";

export const CustomLink = styled(Button)`
  display: flex;
  align-items: center;
  padding: ${({ padding }) => padding || "0px"};
  height: ${({ height }) => height || "17px"};
  width: ${({ width }) => width || "auto"};
  color: ${({ color }) => color || theme.colors.green};
  font-size: ${({ size }) => size || theme.fonts.size.default};
  font-weight: ${({ weight }) => weight || theme.fonts.weight.medium};
  font-family: ${theme.fonts.family};
  margin: ${({ m }) => m || "0 0 0 0"};
  gap: ${({ gap }) => gap || "0px"};
  background: ${({ background }) => background || "transparent"};
  border-radius: ${({ radius }) => radius || "0px"};

  && {
    &.ant-btn-link {
      &:hover {
        color: ${({ color }) => color || theme.colors.green};
        background: ${({ backgroundhover }) =>
          backgroundhover || "transparent"};
      }
    }

    &.ant-btn-default {
      &:hover {
        color: ${({ color }) => color || theme.colors.green};
        background: ${({ backgroundhover }) =>
          backgroundhover || "transparent"};
      }
    }
  }
`;
