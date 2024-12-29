import styled from "styled-components";
import { Drawer } from "antd";

export const CustomDrawer = styled(Drawer)`
  :where(.css-dev-only-do-not-override-djtmh8).ant-drawer .ant-drawer-content-wrapper {
    padding: 0px 38px 37px 42px;
  }

  &&& .ant-drawer {
    &-mask {
      backdrop-filter: blur(4px);
    }

    &-header {
      padding-top: 0;
      border: none;
    }

    &-body {
      padding: ${(props) => props.padding || "5px 38px 24px 42px"} !important;
    }

    &-content-wrapper {
      overflow: hidden;
      border-radius: 0 !important;
      width: 100%;
    }

    &-close {
      display: flex;
      margin: 0;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-family: ${({ theme }) => theme.fonts.family.primary};
      font-weight: ${({ theme }) => theme.fonts.weight.medium};

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }

      &:before {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
