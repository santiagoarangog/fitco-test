import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "../../Skeleton";
import { Div } from "../../../styles/Common";

export const TableSkeleton = ({ columns }) => {
  const numberOfColumns = columns || 8;

  return (
    <Div gap={16}>
      {[...Array(numberOfColumns)].map((v, idx) => (
        <Skeleton
          key={idx}
          title={false}
          loading
          paragraph={{
            rows: 10,
            width: "100%",
          }}
        />
      ))}
    </Div>
  );
};

TableSkeleton.propTypes = {
  columns: PropTypes.array,
};