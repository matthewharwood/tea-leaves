/**
 * Created by matty on 3/7/17.
 */
import {EDirective} from './directive.actions';

export const directiveReducer = (state = [], action) => {
  switch (action.type) {
    case EDirective.Add:
      return state.concat(action.payload);
    case EDirective.Remove:

      return state.filter(i => i.selector !== action.payload);
    default:
      return state;
  }
};
