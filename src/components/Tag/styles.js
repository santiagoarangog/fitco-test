import styled from "styled-components";

import { Tag } from "antd";
import { theme } from "../../styles/theme";

export const CustomTag = styled(Tag)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: ${({ width }) => width || "114px"};
  height: ${({ height }) => height || "36px"};
  color: ${({ color }) => color || theme.colors.gray300};
  opacity: ${({ opacity }) => opacity || "1"};
  font-color: ${({ fc }) => fc || theme.colors.red};
  font-size: ${({ size }) => size || theme.fonts.size.sm};
  font-weight: ${({ weight }) => weight || theme.fonts.weight.regular};
  border: ${({ border }) => border || "1px solid"};
  border-radius: ${({ br }) => br || "21px"};
  border-color: ${({ bc }) => bc || "transparent"};
  text-align: ${({ text }) => text || "center"};
  margin: ${({ m }) => m || "5px"};
  padding: ${({ p }) => p || "12px"};
  box-shadow: ${({ bs }) => bs || ""};
  font-family: ${({ font }) => font || theme.fonts.family.primary};
  
  .ant-tag {
    &-close-icon {
      display: flex;
    }
`;
