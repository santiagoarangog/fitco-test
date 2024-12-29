import styled from "styled-components";
import { Checkbox } from "antd";
import { theme } from "../../styles/theme";

export const AntCheckbox = styled(Checkbox)`
  /* Override Ant Styles */
  && {

    &.ant-checkbox-wrapper {
      &:hover {
        & .ant-checkbox {
          &:not(.ant-checkbox-disabled):not(.ant-checkbox-checked) {
            .ant-checkbox-inner {
              border-color: ${theme.colors.gray300};
              background-color: ${theme.colors.white};
            }
          }

          &-checked {
            &:after {
              border: 0;
              border-radius: 0;
            }

            .ant-checkbox-inner {
              border-color: ${theme.colors.green};
              background-color: ${theme.colors.green};
            }
          }
        }
      }

      .ant-checkbox:hover .ant-checkbox-inner {
        border-color: ${theme.colors.green};
        background-color: ${theme.colors.green};
      }

      &-disabled {
        .ant-checkbox {
          & + span {
            color: ${theme.colors.gray200};
          }
        }
      }
    }

    .ant-checkbox {
      .ant-checkbox-inner {
        border-radius: 5px;
        width: 18px;
        height: 18px;
        border-color: ${(props) =>
          props.error ? props.theme.colors.alert.red : props.theme.colors.gray300};
      }

      &-checked {
        &:after {
          border: 0;
          border-radius: 0;
        }

        .ant-checkbox-inner {
          border-color: ${theme.colors.green};
          background-color: ${theme.colors.green};
        }
      }

      // Label
      & + span {
        color: ${(props) =>
          props.colorLabel ? props.colorLabel : props.theme.colors.gray300};
        font-family: ${theme.fonts.family};
        font-size: ${theme.fonts.size.default};
      }
    }
  }
`;
