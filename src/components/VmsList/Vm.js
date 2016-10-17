import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import VmActions from './VmActions'
import VmIcon from '../VmIcon'
import VmStatusIcon from '../VmStatusIcon'
import VmStatusText from './VmStatusText'

import { selectVmDetail } from '../../actions/vm'

/**
 * Single icon-card in the list
 */
const Vm = ({ vm, icons, onSelectVm }) => {
  const state = vm.get('status')

  const iconId = vm.getIn(['icons', 'large', 'id'])
  const icon = icons.get(iconId)

  // TODO: improve the card flip:
  // TODO: https://davidwalsh.name/css-flip
  // TODO: http://tympanus.net/codrops/2013/12/18/perspective-page-view-navigation/
  // TODO: https://desandro.github.io/3dtransforms/docs/card-flip.html
  return (
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
      <div className='card-pf card-pf-view card-pf-view-select card-pf-view-single-select'>
        <div className='card-pf-body'>
          <div className='card-pf-top-element' onClick={onSelectVm}>
            <VmIcon
              icon={icon}
              className={style['card-pf-icon']}
              missingIconClassName='fa fa-birthday-cake card-pf-icon-circle' />
          </div>
          <h2 className='card-pf-title text-center' onClick={onSelectVm}>
            <VmStatusIcon state={state} />&nbsp;{vm.get('name')}
          </h2>

          <VmActions vm={vm} />
          <VmStatusText vm={vm} />

        </div>
      </div>
    </div>
  )
}
Vm.propTypes = {
  vm: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  onSelectVm: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch, ownProps) => ({
    onSelect: () => dispatch(selectVmDetail({ vmId: ownProps.vm.get('id') })),
  })
)(Vm)
