import * as angular from "angular";

const QUOTE_DELAY_TIME = 8000;

class QuotesDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new QuotesDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {

        function switchQuote() {
            $scope.selectedQuote = ($scope.selectedQuote % 2) + 1;
            $scope.$digest();
            setTimeout(switchQuote, QUOTE_DELAY_TIME);
        }

        setTimeout(switchQuote, QUOTE_DELAY_TIME);
    }
}

export const quotes = angular.module('quotesDirective', []);
quotes.directive('quotesDirective', QuotesDirective.instance);
