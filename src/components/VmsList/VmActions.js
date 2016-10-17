import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { shutdownVm, restartVm, startVm, getConsole, suspendVm } from '../../actions/vm'
import { canRestart, canShutdown, canStart, canConsole, canSuspend } from '../../vm-status'

const Button = ({ render = true, className, tooltip = '', onClick }) => {
  return render ? (
    <div className='card-pf-item'>
      <span className={className} data-toggle='tooltip' data-placement='left' title={tooltip} onClick={onClick} />
    </div>
  ) : null
}
Button.propTypes = {
  render: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

const EmptyAction = ({ state }) => {
  if (!canConsole(state) && !canShutdown(state) && !canRestart(state) && !canStart(state)) {
    return (
      <div className='card-pf-item' />
    )
  }
  return null
}
EmptyAction.propTypes = {
  state: PropTypes.string.isRequired,
}

/**
 * Active actions on a single VM-card.
 * List of actions depends on the VM state.
 */
const VmActions = ({ vm, onStart, onSuspend, onShutdown, onRestart, onGetConsole }) => {
  const status = vm.get('status')

  return (
    <div className='card-pf-items text-center'>
      <EmptyAction state={status} />
      <Button render={canConsole(status)} className='pficon pficon-screen' tooltip='Click to get console' onClick={onGetConsole} />
      <Button render={canShutdown(status)} className='fa fa-power-off' tooltip='Click to shut down the VM' onClick={onShutdown} />
      <Button render={canRestart(status)} className='fa fa-refresh' tooltip='Click to reboot the VM' onClick={onRestart} />
      <Button render={canStart(status)} className='fa fa-angle-double-right' tooltip='Click to start the VM' onClick={onStart} />
      <Button render={canSuspend(status)} className='fa fa-pause' tooltip='Click to suspend the VM' onClick={onSuspend} />
    </div>
  )
}

VmActions.propTypes = {
  vm: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired,
  onSuspend: PropTypes.func.isRequired,
  onShutdown: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onGetConsole: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch, ownProps) => ({
    onGetConsole: () => dispatch(getConsole({ vmId: ownProps.vm.get('id') })),
    onShutdown: () => dispatch(shutdownVm({ vmId: ownProps.vm.get('id'), force: false })),
    onRestart: () => dispatch(restartVm({ vmId: ownProps.vm.get('id'), force: false })),
    onStart: () => dispatch(startVm({ vmId: ownProps.vm.get('id') })),
    onSuspend: () => dispatch(suspendVm({ vmId: ownProps.vm.get('id') })),
  })
)(VmActions)
