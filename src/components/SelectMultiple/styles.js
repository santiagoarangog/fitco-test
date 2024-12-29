import styled from "styled-components";
import { Select } from "antd";
import { theme } from "../../styles/theme";

export const CustomSelect = styled(Select)`
  width: ${(props) => props.width || "359px"} !important;
  font-size: ${theme.fonts.size.default};
  height: ${(props) => props.height || "auto"} !important;

  &&& {
    .ant-select {
      &-selection-search-input {
        padding-left: 10px;
      }

      &-selector,
      &-selection-search-input,
      &-selection-placeholder {
        min-height: ${(props) => props.height || "45px"};

        &:hover {
          border: 1px solid
            ${(props) =>
              props.error
                ? theme.colors.error
                : theme.colors.gray100} !important;
          box-shadow: initial;
          border-radius: ${(props) => props.radius || "7px"};
        }
      }
      &-selection-placeholder,
      &-selection-item {
        line-height: ${(props) => props.height || "35px"};
      }
      &-selection-placeholder {
        color: ${theme.colors.gray200};
      }
      &-selection-item {
        height: ${(props) => props.height || "35px"};
        color: ${theme.colors.black};
        text-transform: capitalize;
        text-align: -webkit-left;
      }
      &-selector {
        align-items: center;
        border-color: ${(props) =>
          props.error ? theme.colors.error : theme.colors.gray100};
        border-radius: ${(props) => props.radius || "7px"};
        // Adding style when search
        .ant-select-selection-search {
          left: 0;
          right: 0;
          padding-left: ${(props) => props.paddingx}px;
        }
      }
    }
    &.ant-select {
      // When focus
      &-focused:not(.ant-select-disabled) {
        .ant-select-selector {
          outline: 0;
          border: 1px solid
            ${(props) =>
              props.error
                ? theme.colors.error
                : theme.colors.gray100} !important;
          box-shadow: initial;
        }
      }
    }
  }
`;
