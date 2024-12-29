import React from 'react';
import PropTypes from 'prop-types'
import { StyledPagination } from './styles';

export const Pagination = ({total,onChange,showSizeChanger,defaultPageSize}) => {
  return (
    <StyledPagination
      total={total}
      onChange={onChange}
      showSizeChanger={showSizeChanger}
      defaultPageSize={defaultPageSize}
    />
  );
}

Pagination.propTypes = {
    total: PropTypes.number,
    onChange: PropTypes.func,
    showSizeChanger: PropTypes.bool,
    defaultPageSize: PropTypes.number,
  };
  