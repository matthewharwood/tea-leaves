/**
 * Created by matty on 3/7/17.
 */


export enum EDirective {
  Add,
  Remove
}

export const add = (payload) => {
 return {
   type:EDirective.Add, payload
 };
};

export const remove = (payload) => {
  return {
    type:EDirective.Remove, payload
  };
};