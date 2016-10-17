import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import ContainerFluid from '../ContainerFluid'
import Vm from './Vm'

/**
 * Data are fetched but no VM is available to display
 */
const NoVm = () => {
  return (
    <div className='blank-slate-pf'>
      <div className='blank-slate-pf-icon'>
        <span className='pficon pficon pficon-add-circle-o' />
      </div>
      <h1>
        No VM available
      </h1>
      <p>
        No VM can is available for the logged user.
      </p>
      <p>
        Learn more about this <a href='#'>on the documentation</a>.
      </p>
      <div className='blank-slate-pf-main-action'>
        <button className='btn btn-primary btn-lg'>TODO: Action</button>
      </div>
    </div>
  )
}

/**
 * Login (token) to Engine is missing.
 */
const NoLogin = () => {
  return (
    <div className='blank-slate-pf'>
      <div className='blank-slate-pf-icon'>
        <span className='pficon pficon pficon-user' />
      </div>
      <h1>
        Please log in ...
      </h1>
    </div>
  )
}

const LoadingData = () => {
  return (
    <div className='blank-slate-pf'>
      <div className='blank-slate-pf-icon'>
        <div className='spinner spinner-lg' />
      </div>
      <h1>
        Please wait
      </h1>
      <p>
        Data are being loaded ...
      </p>
    </div>
  )
}

const Vms = ({ vms, icons }) => {
  const selectedVmId = vms.get('selected')
  const containerClass = 'container-fluid container-cards-pf ' + (selectedVmId ? style['move-left'] : style['move-left-remove'])

  return (
    <span>
      <div className={containerClass}>
        <div className='row row-cards-pf'>
          {vms.get('vms').toList().map(vm => <Vm vm={vm} icons={icons} key={vm.get('id')} />)}
        </div>
      </div>
    </span>
  )
}
Vms.propTypes = {
  vms: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
}

const VmsList = ({ vms, icons, config }) => {
  if (vms.get('vms') && !vms.get('vms').isEmpty()) {
    return (
      <Vms vms={vms} icons={icons} />
    )
  } else if (!config.get('loginToken')) { // login is missing
    return (
      <ContainerFluid>
        <NoLogin />
      </ContainerFluid>
    )
  } else if (vms.get('loadInProgress')) { // data load in progress
    return (
      <ContainerFluid>
        <LoadingData />
      </ContainerFluid>
    )
  } else { // No VM available
    return (
      <ContainerFluid>
        <NoVm />
      </ContainerFluid>
    )
  }
}
VmsList.propTypes = {
  vms: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    vms: state.vms,
    icons: state.icons,
    config: state.config,
  })
)(VmsList)
