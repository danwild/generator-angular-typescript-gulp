/// <reference path="../../../typings/index.d.ts" />

module app.demo {

    'use strict';

    export interface IDemoCtrl {}
    export class DemoCtrl implements IDemoCtrl {
        constructor(
            public $scope: ng.IScope
        ){}
    }

    export interface IDemoService {
        getExcited: boolean;
    }
    export class DemoService implements IDemoService {
        getExcited: boolean = false;
    }

    angular
        .module('app.demo', [])
        .directive("demo", function(): ng.IDirective {
            return {
                templateUrl: 'app-templates/demo/demo.html',
                controller:  DemoCtrl,
                controllerAs: 'demoCtrlVM'
            };
        })
        .controller("demoCtrl", DemoCtrl)
        .factory("demoService", [() => new app.demo.DemoService()]);
}
