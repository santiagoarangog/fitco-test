import styled from "styled-components";
import { DatePicker } from "antd";
import { theme } from "../../styles/theme";

import { css } from "styled-components";

export const INPUT_PLACEHOLDERS = css`
  // Chrome, Firefox, Opera, Safari 10.1+
  ::placeholder {
    font-weight: ${theme.fonts.weight.regular};
    color: ${(props) =>
      props.isdark ? theme.colors.white : theme.colors.gray500};
    opacity: 1; // Firefox
  }

  // Internet Explorer 10-11
  :-ms-input-placeholder {
    font-weight: ${theme.fonts.weight.regular};
    color: ${(props) =>
      props.isdark ? theme.colors.white : theme.colors.gray500};
  }

  // Microsoft Edge
  ::-ms-input-placeholder {
    font-weight: ${theme.fonts.weight.regular};
    color: ${(props) =>
      props.isdark ? theme.colors.white : theme.colors.gray500};
  }
`;

export const INPUT_FOCUS = css`
  outline: 0;
  box-shadow: initial;
`;

export const AntDatePicker = styled(DatePicker.RangePicker)`
  &&& {
    &.ant-picker {
      height: ${({ height }) => height || "45px"};
      padding: 0 16px;
      color: ${theme.colors.black};
      background: ${({ background }) => background || theme.colors.white};
      font-family: ${theme.fonts.family};
      border: 1px solid ${({ border }) => border || theme.colors.gray100};
      border-radius: ${({ radius }) => radius || "7px"};

      &:focus-within {
        ${INPUT_FOCUS};
      }

      &-focused {
        box-shadow: none;
      }

      input {
        font-family: ${theme.fonts.family};
        width: ${({ width }) => width || null};
        height: 100%;
        background: ${({ background }) => background || theme.colors.white};
        opacity: 1;
      }
    }

    .ant-picker {
      &-suffix {
        font-size: 16px;
        margin-right: 5px;
        color: ${theme.colors.black100};
      }

      &-active-bar {
        display: none;
      }
    }
  }
`;
