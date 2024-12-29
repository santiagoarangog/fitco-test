import styled from "styled-components";
import { Table } from "antd";
import { theme } from "../../styles/theme";

export const Wrapper = styled.div`
  width: 100% !important;
`;

export const CustomTable = styled(Table)`
  background-color: ${({ background }) => background || theme.colors.white};
  border-radius: 15px;
  box-shadow: ${({ shadow }) => shadow || "0px 3px 32px #00000010"};

  .table-row-light {
    background-color: ${({ background }) => background || theme.colors.white};
  }
  .table-row-dark {
    background-color: ${({ darkRow }) => darkRow || theme.colors.light};
    border-radius: 0px 8px 8px 0px !important;
  }

  &&& {
    .ant-table {
      &-content {
        background-color: ${({ background }) =>
          background || theme.colors.white};
        padding: ${({ padding }) => padding || "31px 37px 31px 32px"};
      }
      &-column-sorters {
        height: 20px;
        display: contents;
      }
      &-thead {
        th {
          color: ${theme.colors.green};
          font-size: ${theme.fonts.size.sm};
          font-weight: ${theme.fonts.weight.regular};
          background-color: ${({ background }) =>
            background || theme.colors.white};
          font-family: ${({ font }) => font || theme.fonts.family};
          height: 40px;
          &:first-child {
            border-top-left-radius: 12px;
          }
          &:last-child {
            border-top-right-radius: 12px;
          }
          &:before {
            display: none;
          }
        }
        tr {
          th {
            border-bottom: 0px !important;
          }
        }
      }
      &-tbody {
        border-radius: 0px 8px 8px 0px !important;

        td {
          border-bottom: 0px !important;
          padding: 8px 12px;
          color: ${theme.colors.gray500};
          font-size: ${theme.fonts.size.default};
          font-weight: ${theme.fonts.weight.regular};
          font-family: ${({ font }) => font || theme.fonts.family};
        }
        .ant-table-cell-row-hover {
          background-color: transparent;
        }
        .ant-table-cell-row {
          height: 54px;
        }
      }
      &-column-title {
        flex: auto;
        padding: 16px 0;
      }

      // Filter
      &-filter {
        &-column {
          display: flex;
          align-items: center;
          margin: -16px 0;
          &-title {
            padding-left: 0px;
          }
        }

        &-trigger {
          cursor: pointer;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 55px;
          transform: translateX(-12px);

          i {
            display: flex;
            align-items: center;
          }

          &-container {
            &-open,
            &:hover {
              background: transparent;
            }
          }
        }
      }
      /* ### CHECKBOX ### */
      .ant-checkbox-wrapper {
        .ant-checkbox-inner {
          border-radius: 4px;
          border-color: ${theme.colors.gray300};
        }

        .ant-checkbox-checked {
          .ant-checkbox-inner {
            border-color: ${theme.colors.green};
            background-color: ${theme.colors.green};
          }

          &:hover {
            &:after {
              border-color: transparent;
            }
          }

          &:after {
            border-color: transparent;
          }
        }

        &:hover {
          & .ant-checkbox {
            &:not(.ant-checkbox-disabled):not(.ant-checkbox-checked) {
              .ant-checkbox-inner {
                border-color: ${theme.colors.green};
                background-color: hsl(26, 100%, 50%, 0.1);
              }
            }
          }
        }
      }
    }

    /* ### PAGINATION ### */
    .ant-pagination {
      gap: 4px;
      align-items: center;
      margin-top: 8px;

      &-item,
      &-prev,
      &-next {
        min-width: 32px;
        height: 32px;
        margin: 0;
      }

      /* ### PAGINATION - ITEM ### */
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 8px;
        a {
          color: ${theme.colors.black200};
          font-size: ${theme.fonts.size.sm};
          font-weight: ${theme.fonts.weight.medium};
          font-family: ${({ font }) => font || theme.fonts.family};
        }
        &:hover {
          background-color: ${theme.colors.light};
          a {
            color: ${theme.colors.black200};
            font-weight: ${theme.fonts.weight.medium};
          }
        }
        &-active {
          background-color: ${theme.colors.green};
          border: none;

          a {
            color: ${theme.colors.white};
            font-weight: ${theme.fonts.weight.medium};
          }
        }
      }

      /* ### PAGINATION - PREV & NEXT ### */

      &-prev,
      &-next {
        .anticon {
          color: ${({ theme }) => theme.colors.black};
          font-family: "remixicon";

          svg {
            display: none;
          }

          &:after {
            font-style: normal;
            font-size: 24px;
            font-weight: 400;
            line-height: 1;
          }

          &:hover {
            color: ${({ theme }) => theme.colors.black};
          }
        }
      }

      &-prev {
        .anticon {
          &:after {
            content: "\\ea64";
          }
        }
      }

      &-next {
        .anticon {
          &:after {
            content: "\\ea6e";
          }
        }
      }

      &-item-link {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 8px;
      }

      /* ### PAGINATION - ITEMS PER PAGE */
      &-options {
        order: 1;
        margin-right: auto;
        margin-left: 10;

        .ant-select {
          cursor: default;
          display: flex;
          align-items: center;
          &:before {
            content: "${(props) => props.sizerLabels[0]}";
            margin-right: 12px;
          }
          &:after {
            content: "${(props) => props.sizerLabels[1]}";
            margin-left: -8px;
          }
          &:before,
          &:after {
            display: inline-block;
            color: ${theme.colors.black};
            font-weight: ${theme.fonts.weight.medium};
            font-size: ${theme.fonts.size.sm};
            font-family: ${({ font }) => font || theme.fonts.family};
          }
          &-selector {
            cursor: pointer;
            flex: 1;
            border-radius: 7px;
            border: none;
            height: 30px;
            background: ${theme.colors.white} 0% 0% no-repeat padding-box;
            box-shadow: 0px 0px 24px #00000015;
          }
          &.ant-select-open {
            .ant-select-arrow {
              .anticon {
                transform: rotate(180deg);
              }
            }
          }
          &-arrow {
            position: relative;
            margin-top: 0;
            right: 28px;
            width: initial;
            height: initial;
            .anticon {
              color: ${theme.colors.green};
              font-family: "remixicon";
              font-size: 21px;
              line-height: 1;
              &:after {
                content: "\\ea4e";
              }
              svg {
                display: none;
              }
            }
          }
          &-selection-item {
            color: ${theme.colors.green};
            font-weight: ${theme.fonts.weight.bold};
            font-size: ${({ theme }) => theme.fonts.size.sm};
          }
          &-dropdown {
            min-width: 80px !important;

            .ant-select-item-option {
              color: ${theme.colors.green};

              &:hover {
                background-color: ${theme.colors.gray100};
              }

              &-selected {
                background-color: ${theme.colors.gray100};
              }
            }
          }
        }
      }
      &-prev {
        order: 2;
      }
      &-jump-prev {
        order: 3;
      }
      &-jump-next {
        order: 3;
      }
      &-item {
        order: 3;
      }
      &-next {
        order: 4;
      }
    }
  }
`;
