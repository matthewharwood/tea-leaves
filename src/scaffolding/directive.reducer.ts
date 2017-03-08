/**
 * Created by matty on 3/7/17.
 */
import {EDirective} from './directive.actions';

export function directiveReducer(state = [], action) {
  switch (action.type) {
    case EDirective.Add:
      state.push(action.payload);
      return state;
    case EDirective.Remove:
      return state.pop();
    default:
      return state;
  }
}
