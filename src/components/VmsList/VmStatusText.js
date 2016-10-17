import React, { PropTypes } from 'react'

const VmStatusText = ({ vm }) => {
  const lastMessage = vm.get('lastMessage')
  const status = vm.get('status')

  if (lastMessage) {
    return (
      <div>
        <p className='crop' title={lastMessage} data-toggle='tooltip'>
          <span className='pficon-warning-triangle-o' />&nbsp;{lastMessage}
        </p>
      </div>
    )
  } else {
    switch (status) { // TODO: review VM states
      case 'up':
      case 'powering_up':
      case 'paused':
      case 'migrating':
        return (
          <p className='card-pf-info text-center'>
            <strong>Started On</strong>
            {vm.get('startTime')}
          </p>)
      default:
        return (
          <p className='card-pf-info text-center'>
            <strong>Stopped On: </strong>
            {vm.get('stopTime')}
          </p>
        )
    }
  }
}
VmStatusText.propTypes = {
  vm: PropTypes.object.isRequired,
}

export default VmStatusText
