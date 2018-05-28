import { deserializeERModel, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { State } from '@src/app/rootReducer';
import * as actions from './actions';
import { ERModelBox } from './component';
import { ERMAction } from './reducer';

type Dispatch = ReduxDispatch<ERMAction>; // TODO test THUNK <_, State>

export default connect(
  (state: State) => ({
    ...state.ermodel
  }),
  (dispatch: Dispatch) => ({
    onLoad: () => {
      fetch('http://localhost:4000/er') // TODO
        .then(res => {
          return res.text();
        })
        .then(res => JSON.parse(res))
        .then(res => {
          return dispatch(actions.loadERModel(deserializeERModel(res as IERModel)));
        })
        .catch(err => dispatch(actions.loadERModelError(JSON.stringify(err))));
    }
  })
)(ERModelBox);
