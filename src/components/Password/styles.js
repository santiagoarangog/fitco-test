import styled from "styled-components";
import { Input } from "antd";
import { theme } from "../../styles/theme";

export const CustomInputPassword = styled(Input.Password)`
  width: ${({ width }) => width || null};
  height: 45px;
  border: 1px solid ${({ border }) => border || theme.colors.gray100};
  border-radius: 7px;
  opacity: 1;
  padding: 0 16px;

  && {
    &.ant-input-affix-wrapper {
      .ant-input {
        font-family: ${theme.fonts.family};
        color: ${theme.colors.black};
        size: 16px;

        &::placeholder {
          color: #a0aec0;
        }
      }

      &-focused {
        border: 1px solid ${theme.colors.gray100};
        box-shadow: initial;
      }

      &:hover {
        border: 1px solid ${theme.colors.gray100};
      }

      .anticon.ant-input-password-icon {
        color: ${theme.colors.gray100};

        svg {
          width: 22px;
          height: 18px;
        }
      }

      .anticon.ant-input-password-icon {
        &:hover {
          color: ${theme.colors.gray200};
        }
      }
    }
  }
`;
