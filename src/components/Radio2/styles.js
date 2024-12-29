import styled from "styled-components";
import { Radio } from "antd";
import { theme } from "../../styles/theme";

export const AntRadio = styled(Radio)`
  margin: ${({ m }) => m || "0 0 0 0px"};

  /* Override Ant Styles */
  && {
    &.ant-radio-wrapper {
      &:hover {
        & .ant-radio {
          &:not(.ant-radio-disabled):not(.ant-radio-checked) {
            .ant-radio-inner {
              border-color: ${theme.colors.gray300};
              background-color: ${theme.colors.white};
            }
          }

          &-checked {
            .ant-radio-inner {
              border-color: ${theme.colors.green};
              background-color: ${theme.colors.green};

              &:after {
                background-color: ${theme.colors.white};
              }
            }
          }
        }
      }

      &-disabled {
        .ant-radio {
          & + span {
            color: ${theme.colors.gray200};
          }
        }
      }
    }

    .ant-radio {
      .ant-radio-inner {
        width: 18px;
        height: 18px;
        border-color: ${(props) =>
          props.error ? theme.colors.red : theme.colors.gray300};
      }

      &-checked {
        .ant-radio-inner {
          border-color: ${theme.colors.green};
          background-color: ${theme.colors.green};

          &:after {
            background-color: ${theme.colors.white};
          }
        }
      }

      & + span {
        color: ${theme.colors.gray300};
        font-family: ${theme.fonts.family};
        font-size: ${theme.fonts.size.default};
      }
    }
  }
`;
