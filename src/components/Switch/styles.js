import styled from 'styled-components';
import { Switch } from 'antd';
import { theme } from '../../styles/theme';

export const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: ${theme.colors.green50} !important;
  }

  &.ant-switch {
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray100};

    &:hover {
      background-color: ${theme.colors.green100}; /* Color de fondo al pasar el mouse */
    }
  }

  &.ant-switch-checked {
    background-color: ${theme.colors.green100};
    border: 1px solid ${theme.colors.green};
  }

  .ant-switch-handle {
    top: 1px !important;
  }

  .ant-switch-handle::before {
    background-color: ${theme.colors.gray200}; 
  }
  &.ant-switch-checked .ant-switch-handle::before {
    background-color: ${theme.colors.green}; 
  }
`;
