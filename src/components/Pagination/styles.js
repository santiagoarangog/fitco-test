import styled from 'styled-components';
import { Pagination } from 'antd';
import { theme } from '../../styles/theme';

export const StyledPagination = styled(Pagination)`
  margin-top: 14px;
  text-align: end;

    .ant-pagination-item {
    border-color: ${theme.colors.gray100} !important;
    }

    .ant-pagination-item a {
    color: ${theme.colors.gray300} !important;
    }

    .ant-pagination-item-link {
    color: ${theme.colors.gray300} !important;
        &:hover {
        background-color: transparent !important; 
        }
    }

    .ant-pagination-item-active a {
    color: ${theme.colors.gray300} !important;
    }


    .ant-pagination-item:not(.ant-pagination-item-active) {
        &:hover {
        background-color: transparent !important; 
        }
    }
`;