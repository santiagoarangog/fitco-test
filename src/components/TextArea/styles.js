import styled from "styled-components";
import { theme } from "../../styles/theme";

import { Input } from 'antd';
const { TextArea } = Input;

export const CustomTextArea = styled(TextArea)`
  font-family: ${theme.fonts.family};
  width: ${({ width }) => width || null};
  height: ${({ height }) => height || "45px"};
  border: 1px solid ${({ border }) => border || theme.colors.gray100};
  border-radius: ${({ radius }) => radius || "7px"};
  background: ${({ background }) => background || theme.colors.white};
  padding: 0 16px;
  opacity: 1;

  && {
    &.ant-input,
    &.ant-input-affix-wrapper {
      color: ${theme.colors.black};
      size: 16px;

      &::placeholder {
        color: ${({ colorPlaceholder }) => colorPlaceholder || "#a0aec0"};
      }

      &:focus {
        outline: 0;
        border: 1px solid ${theme.colors.gray100} !important;
        box-shadow: initial;
      }

      &:hover {
        border: 1px solid ${theme.colors.gray100};
        box-shadow: initial;
      }

      .ant-input-suffix {
        color: ${theme.colors.blue}; 
      }

    }

    &.ant-input-affix-wrapper {
      &-focused {
        outline: 0;
        border: 1px solid ${theme.colors.gray100} !important;
        box-shadow: initial;
      }

      input {
        &::placeholder {
          color: ${theme.colors.gray100};
        }
      }
    }
  }
`;
