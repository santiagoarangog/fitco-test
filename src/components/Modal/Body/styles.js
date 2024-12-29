import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || "0 44px"};
  max-height: ${(props) => props.maxHeight}px;
  text-align: ${(props) => props.align};
  ${(props) =>
    props.maxHeight &&
    css`
      overflow-x: hidden;
    `}
  p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
