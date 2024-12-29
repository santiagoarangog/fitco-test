import React from "react";
import PropTypes from "prop-types";
import { theme } from "../../styles/theme";
import { Div, Text } from "../../styles/Common";

import { CustomSlider } from "./styles";

export const Slider = ({ value, ...rest }) => {
  const marks = {
    0: {
      label: (
        <Div m="10px 0 0 0">
          <Text
            weight={theme.fonts.weight.bold}
            size={theme.fonts.size.default}
          >
            0
          </Text>
        </Div>
      ),
    },
  };
  marks[value] = {
    label: (
      <Div m="10px 0 0 12px">
        <Text weight={theme.fonts.weight.bold} size={theme.fonts.size.default}>
          {value}
        </Text>
      </Div>
    ),
  };
  return (
    <CustomSlider
      {...rest}
      marks={marks}
      tooltip={{ formatter: null }}
      style={{
        width: "100%",
      }}
      trackStyle={{
        backgroundColor: theme.colors.green,
        height: "8px",
        borderRadius: "8px",
      }}
      railStyle={{
        backgroundColor: theme.colors.gray100,
        height: "8px",
        borderRadius: "8px",
      }}
    />
  );
};

Slider.propTypes = {
  value: PropTypes.string | PropTypes.number | PropTypes.bool,
};