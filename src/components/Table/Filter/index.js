import React, { useState } from "react";
import PropTypes from "prop-types";
import { theme } from "../../../styles/theme";
import Card from "../../CardDropdown";
import Box from "../../Box";
import Checkbox from "../../Checkbox";
import { Button } from "../../Button";
import { Link } from "../../Link";

import { ButtonGroup } from "./styled";

export const TableFilter = ({
  filterLabel,
  resetLabel,
  onFilter,
  onReset,
  filterData,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const createValues = (arrayFilter) => {
    const objValue = {};
    arrayFilter.map((ele) => {
      objValue[ele.id] = false;
      return null;
    });
    return objValue;
  };

  const [values, setValues] = useState(createValues(filterData));
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleFilter = () => {
    const keys = Object.keys(values);
    const valuesKeys = Object.values(values);
    const arraySelected = [];
    valuesKeys.map((ele, i) => {
      if (ele) {
        arraySelected.push(keys[i]);
        return null;
      }
      return null;
    });
    setSelectedKeys(arraySelected);
    onFilter(arraySelected, selectedKeys, confirm);
  };

  const handleReset = () => {
    clearFilters();
    setValues(createValues(filterData));
    setForceUpdate(!forceUpdate);
    onReset();
  };

  const handleChange = (e) => {
    const checked = values;
    checked[e.target.value] = !values[e.target.value];
    setValues(checked);
    setForceUpdate(!forceUpdate);
  };

  return (
    <Card p="16px 20px 12px 20px">
      <Box minWidth="150px">
        <Checkbox.Group direction="column" gap={10}>
          {filterData.map((checkbox) => (
            <Checkbox
              key={checkbox.id}
              value={checkbox.id}
              label={checkbox.label}
              disabled={checkbox.disabled}
              checked={values[checkbox.id]}
              onChange={handleChange}
            />
          ))}
        </Checkbox.Group>
        <ButtonGroup>
          <Button
            background={theme.colors.red}
            height="40px"
            onClick={handleFilter}
          >
            {filterLabel}
          </Button>
          <Link
            color={theme.colors.red}
            size={theme.fonts.size.sm}
            onClick={handleReset}
            height={"20px"}
          >
            {resetLabel}
          </Link>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

TableFilter.propTypes = {
  setSelectedKeys: PropTypes.any,
  selectedKeys: PropTypes.any,
  confirm: PropTypes.any,
  clearFilters: PropTypes.any,
  filterLabel: PropTypes.string.isRequired,
  resetLabel: PropTypes.string.isRequired,
  onFilter: PropTypes.func,
  onReset: PropTypes.func,
  filterData: PropTypes.array,
};
