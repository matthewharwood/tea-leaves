import * as angular from 'angular';

export interface IModalScope extends ng.IScope {
  opened: boolean;
}

export class ModalDirectiveCtrl {

  static $inject = ["$scope", "$element"];

  constructor(
    protected scope: IModalScope,
    protected element: ng.IAugmentedJQuery,
    protected attr: ng.IAttributes,
  ) {}

  public close() {
    this.scope.opened = false;
  }

}
