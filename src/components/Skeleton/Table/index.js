import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import { Div } from "../../../styles/Common";

export const SkeletonTable = ({ columns, rows }) => {
  return (
    <Div gap={16}>
      {[...Array(columns)].map((v, idx) => (
        <Skeleton
          key={idx}
          title={false}
          loading
          active
          paragraph={{
            rows,
            width: "100%",
          }}
        />
      ))}
    </Div>
  );
};

SkeletonTable.defaultProps = {
  columns: 8,
  rows: 10,
};

SkeletonTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};