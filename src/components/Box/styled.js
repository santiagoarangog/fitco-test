import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ p }) => p};
  margin: ${({ m }) => m};
  border: ${({ b }) => b};
  border-top: ${({ bt }) => bt};
  border-right: ${({ br }) => br};
  border-bottom: ${({ bb }) => bb};
  border-left: ${({ bl }) => bl};
  border-radius: ${({ radius }) => radius};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
`
