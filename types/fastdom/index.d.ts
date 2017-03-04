/**
 * Created by matty on 3/4/17.
 */
declare module 'fastdom' {

  interface FastDom {
    measure(): any;
    mutate(): any;
  }

  const FastDom: FastDom;

  export = FastDom;
}