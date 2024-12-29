import styled from "styled-components";
import { Tabs } from "antd";
import { theme } from "../../styles/theme";

export const AntTabs = styled(Tabs)`
  &&& {
    .ant-tabs {
      &-tab {
        color: ${(props) => props.color || theme.colors.black200};
        font-family: ${({ theme }) => theme.fonts.family};
        font-size: ${(props) => props.size || theme.fonts.size.sm};

        &:hover,
        &-active .ant-tabs-tab-btn {
          color: ${({ theme }) => theme.colors.green};
        }

        &-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        &-disabled,
        &-disabled:hover {
          color: ${({ theme }) => theme.colors.gray300};
        }
      }

      &-ink-bar {
        background-color: ${({ theme }) => theme.colors.green};
      }

      &-nav {
        display: flex;
        overflow: hidden;
        white-space: nowrap;

        .ant-tabs-nav-operations {
          display: none; /* Oculta los controles de navegación si no se necesitan */
        }
      }
    }

    &.ant-tabs {
      &-default {
        i {
          font-size: 21px;
        }
      }
      &-small {
        i {
          font-size: 18px;
        }
      }
      &-large {
        i {
          font-size: 24px;
        }
      }
    }
  }
`;
