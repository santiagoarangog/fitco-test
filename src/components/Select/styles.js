import styled from "styled-components";
import { Select } from "antd";
import { theme } from "../../styles/theme";

export const CustomSelect = styled(Select)`
  width: ${(props) => props.width || "359px"};
  font-size: ${theme.fonts.size.default};
  font-family: ${theme.fonts.family};
  border-radius: ${({ radius }) => radius || "7px"};

  &&& {
    .ant-select {
      &-selection-search-input {
        padding-left: 10px;
      }

      &-selector,
      &-selection-search-input,
      &-selection-placeholder {
        font-family: ${theme.fonts.family};
        font-size: ${theme.fonts.size.default};
        color: ${theme.colors.gray200};
        border-color: ${(props) => props.borderColor || theme.colors.gray100};
        height: ${(props) => props.height || "45px"};
        background-color: ${(props) => props.background || theme.colors.white};
        &:hover {
          border: 1px solid
            ${(props) => props.borderColor || theme.colors.gray100} !important;
          box-shadow: initial;
          border-radius: ${({ radius }) => radius || "7px"};
        }
      }
      &-selection-placeholder,
      &-selection-item {
        line-height: ${(props) => props.height || "50px"};
      }
      &-selection-placeholder {
        color: ${theme.colors.gray200};
        border-radius: ${({ radius }) => radius || "7px"};
      }
      &-selection-item {
        height: ${(props) => props.height || "45px"};
        color: ${(props) => props.color || theme.colors.gray500};
        font-weight: ${(props) => props.weight || theme.fonts.weight.regular};
        text-transform: capitalize;
      }
      &-selector {
        align-items: center;
        color: ${theme.colors.gray500};
        border-color: ${(props) => props.borderColor || theme.colors.white};
        box-shadow: none;
        border-radius: ${(props) => props.radius || "8px"};
        height: 100%;
        padding-left: ${(props) => props.paddingx}px;
        padding-right: ${(props) => props.paddingx}px;
        // Adding style when search
        .ant-select-selection-search {
          left: 0;
          right: 0;
          padding: 0 5px;
          input.ant-select-selection-search-input:hover {
            border: none !important;
          }
        }
      }
    }
    &.ant-select {
      // When focus
      &-focused:not(.ant-select-disabled) {
        &.ant-select-show-search {
          img {
            display: none;
          }
        }
        .ant-select-selector {
          outline: 0;
          border: 1px solid
            ${(props) => props.borderColor || theme.colors.white} !important;
          box-shadow: none;
        }
      }
      // When open
      &-open {
        &:not(.ant-select-show-search) {
          .ant-select-arrow {
            transform: rotate(-180deg);
            margin-right: ${(props) => props.allowClear && "8px"};
          }
        }
      }
      // When disabled
      &-disabled {
        .ant-select-selection-placeholder {
          color: ${theme.colors.gray100};
        }
      }
      // On Search
      &-show-search {
        .ant-select-selection-item {
          display: block;
          align-items: center;
        }
      }
    }
  }
`;
