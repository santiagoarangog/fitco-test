import styled from "styled-components";
import { Modal } from "antd";
import { theme } from "../../styles/theme";

export const CustomModal = styled(Modal)`
  :where(.css-dev-only-do-not-override-sk7ap8).ant-modal {
    .ant-modal-content {
      border-radius: ${({ radius }) => radius || "20px"};
      font-family: ${theme.fonts.family};
      text-align: ${(props) => props.align};
      background: ${theme.colors.white} 0% 0% no-repeat padding-box;
      box-shadow: 5px 11px 26px #00000022;

      opacity: 1;
      width: ${(props) => (props.width ? props.width : "478px")};
    }

    .ant-modal-close {
      &:hover {
        background: transparent;
      }
      &-x {
        color: ${theme.colors.green};
      }
    }

    &-body {
      padding: ${(props) => props.padding};
    }
  }
`;
