import * as angular from 'angular';
import * as fastdom from 'FastDom';

export interface IModalScope extends ng.IScope {
  opened: boolean;
}

export class ModalDirectiveCtrl {

  public opened: boolean;
  public shouldClose: boolean;
  private static $inject = ['$scope', '$element'];

  constructor(
    protected scope: IModalScope,
    protected element: ng.IAugmentedJQuery,
    protected attr: ng.IAttributes,
  ) {
    this.opened = false;
    this.shouldClose = typeof this.shouldClose !== 'undefined' ?
      this.shouldClose : true;
    this.scope = scope;
    this.update();
  }

  public update() {
    fastdom.measure(() => {
      if (window.innerWidth > 1023 && this.opened && this.shouldClose) {
        this.close();
      }
    });

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  public close() {
    this.opened = false;
    this.scope.opened = false;
    document.body.style.overflow = 'auto';
  }

}
