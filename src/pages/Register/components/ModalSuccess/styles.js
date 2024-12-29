import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const ProfileImg = styled.div`
  height: 107px;
  width: 107px;
  background: ${({ background }) =>
    background
      ? `url(${background}) no-repeat`
      : `${theme.colors.green500} 0% 0% no-repeat padding-box`};
  background-position: center center;
  background-size: cover;
  border-radius: 100%;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 89px;
  width: 294px;
  padding: 19px 16px 16px 16px;
  background: ${`${theme.colors.gray50} 0% 0% no-repeat padding-box`};
  background-position: center center;
  background-size: contain;
  border-radius: 14px;
  object-fit="cover"
  text-align: left;
  gap: 11px;
  opacity: 1;
`;

export const IconBackground = styled.div`
  height: 52px;
  width: 52px;
  padding: 11px 11px 11px 11px;
  background: ${`${theme.colors.green500} 0% 0% no-repeat padding-box`};
  border-radius: 100%;
  opacity: 1;
`;
