import styled from "styled-components";
import { Collapse } from "antd";
import { theme } from "../../styles/theme";

export const Card = styled.div`
  display: flex;
  width: 90%;
  height: 75vh;
  min-height: 75vh;
  padding: 25px 36px 15px 38px;
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 7px 26px #0000000b;
  border-radius: 15px;
  opacity: 1;
  overflow-y: auto;
`;

export const CustomCollapse = styled(Collapse)`
  .ant-collapse-item {
    position: relative;
    width: ${({ width }) => width || "100%"} !important;
    border-radius: ${({ group }) =>
      group ? "0px !important" : "15px !important"};
    box-shadow: ${({ group }) => (group ? "0" : "0px 7px 26px #0000000B")};

    .ant-collapse-content {
      border-radius: 0 0 15px 15px !important;
      opacity: 1;
      border: 1px solid ${theme.colors.white};
      width: 100%;
      height: min-content;
      max-height: min-content;
      padding-bottom: 20px;

      .ant-collapse-content-box {
        padding-top: 0px;
      }
    }

    .ant-collapse-header {
      color: ${({ fontColor }) => fontColor || theme.colors.blue};
      align-items: center;
      border-radius: ${({ group }) =>
        group ? "0px !important" : "15px !important"};
      height: ${({ headerHeight }) => headerHeight};

      .ant-collapse-header-text {
        font-family: ${theme.fonts.family};
        font-size: ${({ fontSize }) => fontSize || "18px"} !important;
        font-weight: ${({ fontWeight }) =>
          fontWeight || theme.fonts.weight.medium};
      }

      .ant-collapse-arrow {
        font-size: 14px;
      }
    }
  }
`;
