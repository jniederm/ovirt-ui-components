import React, { PropTypes } from 'react'

import style from './style.css'

import ContainerFluid from '../ContainerFluid'
import LoginButton from './LoginButton'
import VmUserMessages from '../VmUserMessages'

function isUnread (userMessages) {
  return userMessages.get('unread')
}

/**
 * Main application header on top of the page
 */
const VmsPageHeader = ({ title, userMessages }) => {
  const titleStyle = { padding: '0px 0 5px' }

  return (
    <nav className='navbar navbar-default navbar-pf'>
      <ContainerFluid>
        <div className='navbar-header'>
          <a className='navbar-brand' style={titleStyle} href='/'>{title}</a>
        </div>
        <ul className='nav navbar-nav navbar-utility'>
          <li>
            <LoginButton />
          </li>
          <li className='dropdown'>
            <a href='#' data-toggle='dropdown'>
              <div className={isUnread(userMessages) ? style['usermsgs-unread'] : style['usermsgs-allread']}>
                <span className='pficon pficon-info' />&nbsp;Messages
              </div>
            </a>
            <VmUserMessages userMessages={userMessages} />
          </li>
        </ul>
      </ContainerFluid>
    </nav>
  )
}
VmsPageHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userMessages: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default VmsPageHeader
