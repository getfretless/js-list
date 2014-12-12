var ElevenList = function() {
  function ElevenList() {
    var app = this;
    var tasks = [];
    var setupNewTaskForm = function() {
      $('form#new_task').submit(function(event) {
        event.preventDefault();
        $('.tasks').append(listItem($('#task_name').val()));
      });
    }();
    var setupEditTaskForm = function() {
      $('.tasks').on('submit', 'form.edit_task', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget);
        value = form.find('input.edit_task_name').val();
        form.closest('.list-group-item').replaceWith(listItem(value));
      });
      $('.tasks').on('click', 'button.cancel', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget).closest('form');
        value = form.find('input.original_value').val();
        form.closest('.list-group-item').replaceWith(listItem(value));
      });
    }();
    var setupDeleteButtons = function() {
      $('.tasks').on('click', 'button.delete', function(){
        $(this).closest('li').remove();
      });
    }();
    var setupEditButtons = function() {
      $('.tasks').on('click', 'button.edit', function (event) {
        event.preventDefault();
        var newForm = editTaskForm(this);
        $(this).closest('div.task').replaceWith(newForm);
        newForm.find('input.edit_task_name').select();
      });
    }();
    var listItem = function(value) {
      return '<li class="list-group-item">' +
          '<div class="task">' +
            '<label class="checkbox-inline">' +
              '<input type="checkbox"> ' +
              value +
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
      form.find('input.edit_task_name, input.original_value').val(value);
      return form.removeClass('hidden');
    };
  }
  return ElevenList;
}();

elevenlist = new ElevenList();
