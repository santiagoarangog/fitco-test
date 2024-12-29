import React from "react";
import PropTypes from "prop-types";

import { TableSkeleton } from "./Skeleton";
import { TableFilter } from "./Filter";

import { Wrapper, CustomTable } from "./styles";

export const Table = ({ 
  columns, 
  data, 
  sizerLabels, 
  background,
  darkRow, 
  shadow,
  padding,
  ...rest }) => {
  return (
    <Wrapper>
      <CustomTable
        columns={columns}
        dataSource={data}
        sizerLabels={sizerLabels}
        background={background}
        darkRow={darkRow}
        shadow={shadow}
        padding={padding}
        {...rest}
      />
    </Wrapper>
  );
};

Table.defaultProps = {
  sizerLabels: ["Show", "Results"],
};

Table.Skeleton = TableSkeleton;
Table.Filter = TableFilter;

Table.propTypes = {
  columns: PropTypes.array, 
  data: PropTypes.array, 
  sizerLabels: PropTypes.array,
  background: PropTypes.string,
  darkRow: PropTypes.string,
  shadow: PropTypes.string,
  padding: PropTypes.string,
};