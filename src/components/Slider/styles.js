import styled, { css } from "styled-components";
import { Slider } from "antd";
import { theme } from "../../styles/theme";

export const CustomSlider = styled(Slider)`
  .ant-slider-dot {
    border-color: ${theme.colors.green};
    margin-top: 2px;
  }

  .ant-slider-handle {
    box-shadow: none;
    margin-top: -5px;

    &::after {
      background-color: ${theme.colors.green};
      box-shadow: none;
      width: 24px;
      height: 24px;
    }
    &::before {
      box-shadow: none;
    }
    &:hover::after {
      box-shadow: none;
      width: 24px;
      height: 24px;
    }
    &:focus::after {
      box-shadow: none;
      width: 24px;
      height: 24px;
    }
  }
`;
