var isImportant = false;
var isAsideVisble = true;

function toggleImportant(){
    let icon = $(".iImportant");
    if(isImportant){
        icon.removeClass("fas").addClass("far");
        isImportant = false;
    }else{
        icon.removeClass("far").addClass("fas");
        isImportant = true;
    }
    
}

function saveTask(){
    let title = $("#txtTitle").val();
    let dueDate = $("#txtDueDate").val();
    let location = $("#txtLocation").val();
    let description = $("#txtDescription").val();
    let participants = $("#txtParticipants").val();
    let color = $("#txtColor").val();

    if(!title) {
        alert("Error, empty titles are not allowed!");
        return;
    }
    
    let theTask = new Task(isImportant, title, dueDate, description, location, participants, color);
    console.log(theTask);

    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(theTask),
        contentType: "application/json",
        success: function(response){
            console.log("Sever Says:", response);
            let savedTask = JSON.parse(response);

            displayTask(savedTask);
            clearForm();
        },
        error: function(details){
            console.log("Save failed", details);

        }

    });
}

function displayTask(task){
    let syntax = `<div class="task">

            <div class="task-title">
                <h5>${task.title}</h5>
                <p>${task.description}</p>
            </div>


            <div class="task-location">
                <label> <i class="fas fa-map-marker-alt"></i> ${task.location}</label>
                <label> <i class="fas fa-clock"></i> ${task.dueDate}</label>
            </div>

        </div>`;

    $(".task-container").append(syntax);
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDueDate").val("");
    $("#txtLocation").val("");
    $("#txtDescription").val("");
    $("#txtParticipants").val("");
    $("#txtColor").val("");
}


function toggleDetails() {
    let aside = $("aside");
    if(isAsideVisble){
        aside.hide();
        isAsideVisble = false;
    }else{
        aside.show();
        isAsideVisble = true;
    }
    
}

function fetchTasks(){
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        type: "GET",
        success: function(response){
            let allTasks = JSON.parse(response);

            for(i=0; i<allTasks.length; i++) {
                let task = allTasks[i];
                if(task.name ==="Brett"){
                    displayTask(task);
                };
            }
        },
        error: function(details){
            console.log("Server Failed", details)
        }
    });
}

function deleteTasks() {
   $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Brett",
        type: "DELETE",
        success: function(){
            $(".task-container").html("");

        }
   });
};

function init(){

    fetchTasks();

    $("#btnSave").click(saveTask);

    $(".iImportant").click(toggleImportant);

    $("#btnToggleDetails").click(toggleDetails);

    $("#btnDeleteTasks").click(deleteTasks);
}



window.onload = init;

