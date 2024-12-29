import styled from "styled-components";
import { theme } from "../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.light};
  width: 100%;
  height: max-content;
  margin: ${({ m }) => m || "0px 0px 0px 0px"};
`;

export const ModuleContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || null};
  width: 100%;
  height: 100%;
  padding: ${({ padding }) => padding || "52px 0 0 32px"};
  overflow-y: scroll;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: ${({ height }) => height || null};
  width: ${({ width }) => width || null};
  margin: ${({ m }) => m || "0px 0px 0px 0px"};
  align-items: ${({ align }) => align || null};
  justify-content: ${({ justify }) => justify || null};
  gap: ${({ gap }) => gap || null};
  padding: ${({ p }) => p || "0px 0px 0px 0px"};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || null};
  height: ${({ height }) => height || null};
  align-items: ${({ align }) => align || null};
  justify-content: ${({ justify }) => justify || null};
  border-radius: ${({ radius }) => radius || "0px"};
  margin: ${({ m }) => m || "0px 0px 0px 0px"};
`;

export const Div = styled.div`
  display: flex;
  flex: ${({ flex }) => flex || null};
  align-items: ${({ align }) => align || null};
  justify-content: ${({ justify }) => justify || null};
  gap: ${({ gap }) => gap || null};
  margin: ${({ m }) => m || null};
  padding: ${({ p }) => p || null};
  width: ${({ width }) => width || null};
  height: ${({ height }) => height || null};
  min-width: ${({ minwidth }) => minwidth || null};
  min-height: ${({ minheight }) => minheight || null};
  max-width: ${({ maxwidth }) => maxwidth || null};
  max-height: ${({ maxheight }) => maxheight || null};
  flex-direction: ${({ direction }) => direction || null};
  border-radius: ${({ radius }) => radius || "0px"};
  background-color: ${({ background }) => background || "transparent"};
  border: ${({ border }) => border || "0px"};
  border-color: ${({ borderColor }) => borderColor || null};
`;

export const Text = styled.div`
  font-family: ${theme.fonts.family};
  color: ${(props) => (props.color ? props.color : props.theme.colors.black)};
  font-size: ${(props) => props.size || theme.fonts.size.default};
  font-weight: ${(props) => (props.weight ? props.weight : 400)};
  text-align: ${(props) => props.align};
  margin-top: ${(props) => props.mt || "2px"};
  margin-bottom: ${(props) => props.mb};
  line-height: ${(props) => props.lineHeight};
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || null};
  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 5px 11px 26px #00000022;
  border-radius: 20px;
  opacity: 1;
`;
