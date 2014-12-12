var ElevenList = function() {
  function ElevenList() {
    var _this = this;
    this.tasks = {};
    this.counter = 0;
    $('.tasks').sortable({
      update: function() { updatePositions(); }
    });


    var supportsStorage = function() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    };
    var loadTasks = function() {
      if (supportsStorage()) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks !== null) {
          _this.tasks = tasks;
          var tasksToAdd = [];
          for (var task in tasks) {
            if (tasks.hasOwnProperty(task)) {
              tasksToAdd.splice(tasks[task].position - 1, 0, tasks[task]);
              if (task > _this.counter) {
                _this.counter = task;
              }
            }
          }
          for (var i=0; i < tasksToAdd.length; i++) {
            $('.tasks').append(listItem(tasksToAdd[i]));
          }
        }
      }
    };
    var setupNewTaskForm = function() {
      $('form#new_task').submit(function(event) {
        event.preventDefault();
        _this.counter ++;
        var id = _this.counter.toString()
        var task = {
          id: id,
          position: Object.keys(_this.tasks).length + 1,
          name: $('#task_name').val(),
          completed: false
        };
        _this.tasks[id] = task;
        $('.tasks').append(listItem(task));
        $('#task_name').val('');
        saveTasks();
      });
    }();
    var setupEditTaskForm = function() {
      $('.tasks').on('submit', 'form.edit_task', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget);
        value = form.find('input.task_name').val();
        var id = form.closest('li').attr('id')
        id = id.substring(id.lastIndexOf('_') + 1);
        _this.tasks[id].name = value;
        form.closest('li').replaceWith(listItem(_this.tasks[id]));
        saveTasks();
      });
      $('.tasks').on('click', 'button.cancel', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget).closest('form');
        var id = form.closest('li').attr('id')
        id = id.substring(id.lastIndexOf('_') + 1);
        form.closest('li').replaceWith(listItem(_this.tasks[id]));
      });
    }();
    var setupDeleteButtons = function() {
      $('.tasks').on('click', 'button.delete', function(event) {
        event.preventDefault();
        var id = $(this).closest('li').attr('id');
        id = id.substring(id.lastIndexOf('_') + 1);
        $(this).closest('li').remove();
        delete _this.tasks[id];
        updatePositions();
      });
    }();
    var setupEditButtons = function() {
      $('.tasks').on('click', 'button.edit', function (event) {
        event.preventDefault();
        var newForm = editTaskForm(this);
        $(this).closest('div.task').replaceWith(newForm);
        newForm.find('input.task_name').select();
      });
    }();
    var setupCheckboxes = function() {
      $('.tasks').on('click', ':checkbox', function () {
        var id = $(this).closest('li').attr('id')
        id = id.substring(id.lastIndexOf('_') + 1);
        $(this).closest('li').toggleClass('completed');
        _this.tasks[id].completed = $(this).closest('li').hasClass('completed');
        saveTasks();
      });
    }()
    var listItem = function(task) {
      return '<li class="list-group-item' + (task.completed ? ' completed' : '')  + '" id="task_' + task.id + '">' +
          '<div class="task">' +
            '<label class="checkbox-inline">' +
              '<input type="checkbox"' + (task.completed ? ' checked>' : '>') +
              task.name +
            '</label>' +
            '<div class="btn-group">' +
              '<button class="delete btn btn-sm btn-danger">' +
                '<i class="fa fa-trash-o"></i>' +
              '</button>' +
              '<button class="edit btn btn-sm btn-success">' +
                'Edit' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</li>';
    };
    var editTaskForm = function(element) {
      var value = $(element).closest('.task').find('label').text().trim();
      var form = $('form.edit_task.hidden').clone();
      form.find('input.task_name, input.original_value').val(value);
      return form.removeClass('hidden');
    };
    var updatePositions = function() {
      var tasks = $('.tasks').sortable('toArray');
      var i, id;
      for (i=0; i < tasks.length; i++) {
        id = tasks[i].substring(tasks[i].lastIndexOf('_') + 1);
        _this.tasks[id].position = i + 1;
      }
      saveTasks();
    };
    var saveTasks = function() {
      if (supportsStorage()) {
        localStorage.tasks = JSON.stringify(_this.tasks);
      }
    };
    loadTasks();
  };
  return ElevenList;
}();

elevenlist = new ElevenList();
