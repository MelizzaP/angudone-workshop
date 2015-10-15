"use strict";

var app = angular.module("TodosApp", []);

// this is for a factory
// factories simply invoke functions
// app.factory('myfactory', [
//   '$http',
//   function($http){
//     var obj = {},
//     index = 0;
//     obj.todos = [
//       { id:++index, text: "learn ng", completetime:1444924556695},
//       { id:++index, text: "teach no"},
//       { id:++index, text: "profit"}
//     ];
//     obj.markdone = function (t) {
//       if(t.completetime) {
//         delete t.completetime;
//       }
//       else{
//         t.completetime = new date().gettime();
//       }
//     };
//
//     obj.addtodo = function (newtodo, todos) {
//       todos.push({id:++index, text: newtodo.newitem});
//       newtodo.newitem = undefined;
//     };
//
//     return obj;
//   }
// ]);

// this is for a service
// services are invoked like a constructor
// this will point to a newly created service
app.service('MyService', [
  '$http',
  function($http){
    var index = 0;
   var todos = [
      { id:++index, text: "learn ng", done:1444924556695},
      { id:++index, text: "teach no"},
      { id:++index, text: "profit"}
    ];

    this.getTodos = function() {
      return $http.get('/todos').then(function(resp) {
        return resp.data;
      }, function(err) {
        console.log(err);
      });
    };

    this.markDone = function (t) {
      if(t.done) {
        delete t.done;
      }
      else{
        t.done = new Date().getTime();
      }
    };

    this.addTodo = function (newTodo, todos) {
      return $http.post('/todos').then(function(resp) {
        todos.push({id:++index, text: newTodo.newItem});
        return resp.data;
      }, function(err) {
        console.log(err);
      });
    };
  }
]);

app.controller('MainCtrl', [
  'MyService',
  function(service){
    var vm = this;
    service.getTodos().then(function(succ) {
      vm.todos = succ;
    }, function(err) {});

    vm.markDone = service.markDone;

    service.addTodo(vm.newTodo, vm.todos).then(function(succ) {
      vm.addTodo = succ;
    }, function(err) {});
  }
]);


app.controller('counterCtrl', [
  'MyService',
  function(service){
    var vm = this;
    service.getTodos().then(function(succ) {
      console.log(succ)
      vm.todos = succ;
    });
  }
]);
