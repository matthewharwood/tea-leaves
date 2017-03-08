/**
 * Created by matty on 3/7/17.
 */
import {appState} from './appState';

import {add} from './directive.actions';

export function Directive(meta: any) {
  return function register(target: any) {
    appState.dispatch(add(meta));
    // Add metadata
    target.__meta = meta;
    console.log(appState.getState());
    // Return target
    return target;
  };
}
