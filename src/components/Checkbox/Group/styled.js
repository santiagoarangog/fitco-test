import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap}px;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => props.direction};
  height: ${(props) => props.height};
  // For Checkbox.Group
  & .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
  ${(props) =>
    props.asPills &&
    css`
      && {
        .ant-checkbox {
          display: none;

          & + span {
            color: ${({ theme }) => theme.colors.grey1};
            font-size: ${({ theme }) => theme.fonts.size.sm};
            background-color: ${({ theme }) => theme.colors.grey1};
            border-radius: 50px;
            user-select: none;
            padding: 4px 14px;
          }

          &.ant-checkbox-checked {
            & + span {
              background-color: ${({ theme }) => theme.colors.grey1};
            }
          }

          &.ant-checkbox-disabled {
            & + span {
              background: transparent;
            }
          }
        }
      }
    `}
`;
