import React from 'react'
import PropTypes from 'prop-types'

import { Surface } from './styled'

const Card = ({ elevation, radius, p, m, children }) => {
  return (
    <Surface elevation={elevation} radius={radius} p={p} m={m}>
      {children}
    </Surface>
  )
}

Card.defaultProps = {
  elevation: 2,
  radius: 8,
  p: '12px',
  m: '0px',
}

Card.propTypes = {
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  radius: PropTypes.number,
  p: PropTypes.string,
  children: PropTypes.node.isRequired,
  m: PropTypes.string
}

export default Card
