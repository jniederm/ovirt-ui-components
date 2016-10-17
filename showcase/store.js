import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {
  DummyReducer as dummy,
  VmsReducer as vms,
  IconsReducer as icons,
  ConfigReducer as config,
} from 'ovirt-ui-components'

export const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({ dummy, vms, icons, config })

export default createStore(reducer, applyMiddleware(sagaMiddleware))
