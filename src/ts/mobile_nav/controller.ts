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
) {
   this.scope.opened = false;
  }


  public close() {
    this.scope.opened = false;
    this.scope.$root.$emit('bodyScroll', this.scope.opened)
  }

  public toggle() {
    this.scope.opened = !this.scope.opened;
    this.scope.$root.$emit('bodyScroll', this.scope.opened)
  }

  public getOpen() {
    return this.scope.opened;
  }
}
