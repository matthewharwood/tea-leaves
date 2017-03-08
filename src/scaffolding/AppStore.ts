/**
 * Created by matty on 3/7/17.
 */
import {createStore} from 'redux';
import {directiveReducer} from './directive.reducer';
export let appState = createStore(directiveReducer);