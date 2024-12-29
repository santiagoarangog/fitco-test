import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from './styled'

const Box = ({
  p,
  m,
  b,
  bt,
  br,
  bb,
  bl,
  radius,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  color,
  bgColor,
  children,
  ...rest
}) => {
  return (
    <Wrapper
      p={p}
      m={m}
      b={b}
      bt={bt}
      br={br}
      bb={bb}
      bl={bl}
      radius={radius}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      color={color}
      bgColor={bgColor}
      {...rest}
    >
      {children}
    </Wrapper>
  )
}

Box.propTypes = {
  p: PropTypes.string,
  m: PropTypes.string,
  b: PropTypes.string,
  bt: PropTypes.string,
  br: PropTypes.string,
  bb: PropTypes.string,
  bl: PropTypes.string,
  radius: PropTypes.string,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node,
}

export default Box
