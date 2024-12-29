import styled from "styled-components";
import { Select } from "antd";
import { theme } from "../../styles/theme";

export const CustomSelect = styled(Select)`
  width: 98px;
  font-size: ${theme.fonts.size.default};
  font-family: ${theme.fonts.family};
  border-radius: 24px;
  color: ${theme.colors.gray500};
  align-self: flex-start;

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
        border-color: ${theme.colors.white};
        height: 48px;
        background-color: ${(props) => props.backgroundColor || "transparent"};
        &:hover {
          border: 1px solid ${theme.colors.white} !important;
          box-shadow: initial;
          border-radius: 24px;
        }
      }
      &-selection-placeholder,
      &-selection-item {
        line-height: 48px;
      }
      &-selection-item {
        height: 48px;
        padding-top: 1px;
        color: ${(props) => props.color || theme.colors.gray500};
        font-weight: ${theme.fonts.weight.regular};
        text-transform: capitalize;
      }
      &-selector {
        align-items: center;
        color: ${theme.colors.gray300};
        border-color: ${theme.colors.white};
        border-radius: 24px;
        // Adding style when search
        .ant-select-selection-search {
          left: 0;
          right: 0;
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
          border: 1px solid ${theme.colors.white} !important;
          box-shadow: initial;
        }
      }
    }
  }
`;
