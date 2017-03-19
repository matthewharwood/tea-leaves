import * as angular from 'angular';

export interface IMobileNavigationScope extends ng.IScope {
  opened: boolean;
}

export class MobileNavigationDirectiveCtrl {

  private static $inject = ['$scope', '$element'];

  constructor(
      protected scope: IMobileNavigationScope,
      protected element: ng.IAugmentedJQuery,
      protected attr: ng.IAttributes,
  ) {}

  public close() {
    console.log('closed');
    this.scope.opened = false;
    console.log(this.scope)
  }

  public open() {
    this.scope.opened = true;

  }

  public getOpen() {
    return this.scope.opened;
  }
}
