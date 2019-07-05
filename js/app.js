angular.module('myApp', [])
	.service('notesService', function () {
		var notes = [
			{id:1, title:'Ex. See Android'},
			];

		return {
			notes:function () {
				return notes;
			},
			addNote:function (noteTitle) {
				var currentIndex = notes.length + 1;
				notes.push({
					id:currentIndex, title:noteTitle
				});
			},
			deleteNote:function (id) {
				var oldNotes = notes;
				newNotes = [];

				angular.forEach(oldNotes, function (note) {
					if (note.id !== id) newNotes.push(note);
				});
				notes = newNotes;
			}
		};
	})
	.directive('myNotebook', function () {
		return {
			restrict:"E",
			scope:{
				notes:'=',
				ondelete:'&'
			},
			templateUrl:"js/partials/notebook-directive.html",
			controller:function ($scope) {
				$scope.deleteNote = function (id) {
					$scope.ondelete({id:id});
				}
			}
		};
	})
	.directive('myNote', function () {
		return {
			restrict:'E',
			scope:{
				delete:'&',
				note:'='
			},
			link:function (scope, element, attrs) {
				element.fadeIn('slow');

			}
		};
	})
	.controller('NotebookCtrl', ['$scope', 'notesService', function ($scope, notesService) {
		$scope.getNotes = function () {
			return notesService.notes();
		};

		$scope.addNote = function (noteTitle) {
			if(noteTitle != '') {
				notesService.addNote(noteTitle);
			}
		};

		$scope.deleteNote = function (id) {
			notesService.deleteNote(id);
		};

		$scope.resetForm = function() {
			$scope.noteTitle = '';
		};
	}]);
