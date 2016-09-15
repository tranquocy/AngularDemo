var app = angular.module('todo', ['oitozero.ngSweetAlert', 'LocalStorageModule']);

app.controller('MainController', function($scope, SweetAlert, localStorageService){
  var localTodoList = localStorageService.get('listTodo');

  $scope.listTodo = localTodoList || [];

  // Watch for changes in the value of $scope.listTodo.
  // If someone adds or removes a todo,
  // it will then keep our local storage todos datastore in sync.
  $scope.$watch('listTodo', function () {
    localStorageService.set('listTodo', $scope.listTodo);
  }, true);

  // Add todo
  $scope.addTodo = function() {
    $scope.listTodo.push({
      'text': $scope.inputTodo,
      'completed': false
    });
    $scope.inputTodo = '';
  };

  // Delete todo
  $scope.destroy = function(index) {

    // Using angular sweet alert to confirm delete or not?
    SweetAlert.swal({
      title: "Are you sure?",
      text: "You want to delete this todo!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false,
      closeOnCancel: false
    },

    // Confirm delete or not?
    function(isConfirm){
      if (isConfirm) {
        $scope.listTodo.splice(index, 1);
        SweetAlert.swal("Deleted!", "This todo has been deleted.", "success");
      } else {
        SweetAlert.swal("Cancelled", "This todo is safe :)", "error");
      }
    });
  };

  // Clear completed
  $scope.clearCompleted = function() {
    $scope.listTodo = $scope.listTodo.filter(function(item) {
      return !item.completed;
    });
  };
});