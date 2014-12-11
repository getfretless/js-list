$(document).ready(function(){
  $("form#new_task").submit(function(event){
    event.preventDefault();
    var deleteButton = "<button class='delete btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button>";
    var editButton = "<button class='edit btn btn-sm btn-success'>Edit</button>";
    var buttons = "<div class='btn-group'>" + deleteButton + editButton + "</div>";
    var checkBox = "<input type='checkbox'>";
    $(".tasks").append("<li class='list-group-item'>" +
      "<div class='task'><label class='checkbox-inline'>" + checkBox + ' ' +
      $("#task_name").val() + '</label>' + buttons + "</div></li>");
    $("#task_name").val('');

  });

  $(".tasks").on("click", "button.delete", function(){
    $(this).closest("li").remove();
  });

  $(".tasks").on("click", "button.edit", function (){
    var editTaskForm = "<form class='edit_task'><input type='text' name='edit_task_name'></form>";
    var originalTask = $(this).parent().val();
    var deleteButton = "<button class='delete btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button>";
    var editButton = "<button class='edit btn btn-sm btn-success'>Edit</button>";
    var buttons = "<div class='btn-group'>" + deleteButton + editButton + "</div>";
    $(this).closest("div.task").replaceWith(editTaskForm);
    $("form.edit_task ").on("submit", function(){
      event.preventDefault();
      var checkBox = "<label><input type='checkbox'></label>";
      $(this).replaceWith("<div>" + $(".edit_task_name").val() + buttons + "</div>");
    });
  });

  $(".tasks").on("click", ":checkbox", function (){
    $(this).closest("li").toggleClass("completed");
  });
});
