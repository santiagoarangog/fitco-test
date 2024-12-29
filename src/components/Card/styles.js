import styled from "styled-components";
import { theme } from "../../styles/theme";

export const CustomCard = styled.div`
  width: ${({ width }) => width || null};
  min-height: ${({ height }) => height || null};
  height: ${({ height }) => height || null};
  background: ${({ background }) => background || theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: ${({ shadow }) => shadow ||  "0px 1px 2px 0px rgba(0, 0, 0, 0.05)"} ;
  border-radius: 20px;
  opacity: 1;
  padding: ${({ padding }) => padding || "0px 60px"};
  margin: ${({ margin }) => margin || "0px 0px 0px 0px"};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
`;
