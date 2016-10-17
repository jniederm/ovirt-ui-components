import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import { logout } from '../../actions/vm'

const LoginButton = ({ config, onLogin, onLogout }) => {
  if (config.get('loginToken')) {
    return (
      <a className={style['user-name']} href='#' onClick={onLogout}>
        <i className='fa fa-sign-out' aria-hidden='true' />&nbsp;{config.getIn(['user', 'name'])}
      </a>
    )
  }

  // TODO: dispatch login action to show login dialog
  return (
    <a className='user-name' href='#' onClick={onLogin}>
      <i className='fa fa-sign-in' aria-hidden='true' />&nbsp;Login
    </a>
  )
}

LoginButton.propTypes = {
  config: PropTypes.object.isRequired,
  onLogin: PropTypes.func, // TODO: make required
  onLogout: PropTypes.fund.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    onLogout: () => dispatch(logout()),
    onLogin: () => {}, // dispatch(showLoginDialog())
  })
)(LoginButton)
