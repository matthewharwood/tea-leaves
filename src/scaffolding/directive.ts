/**
 * Created by matty on 3/7/17.
 */
import {createStore} from 'redux';
import {directiveReducer} from './directive.reducer';
import {add} from './directive.actions';

export function Directive(meta: any) {
  const store = createStore(directiveReducer);

  return function register(target: any) {
    store.dispatch(add(meta));
    // Add metadata
    target.__meta = meta;
    console.log(store.getState());
    // Return target
    return target;

  };
}
