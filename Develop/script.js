var saveBtn = $(".saveBtn")
var dateTracker = $("#currentDay")
var textArea = $(".textarea")
var timeEl = $("#currentDay")
var scheduleSpace = $("#scheduleSpace")
var toDos = ["","","","","","","",""]

// set the time at the top of the page
function time(){
    var currentTime = moment().format("dddd MMMM Do [|] hh:mm:ss a")
    timeEl.text(currentTime)
}

// what happens when you hit save
function saveText(event){
    event.preventDefault();
    var thisButton = $(event.target);
    var saveThisForm = thisButton.siblings(".textarea")
    var saveThisText = saveThisForm.val()
    var timeOfDay = parseInt(saveThisForm.attr("time"))
    var atThisTOD = timeOfDay-9
    toDos[atThisTOD]=saveThisText
    var toDosStringified = JSON.stringify(toDos)
    localStorage.setItem('toDos',toDosStringified)
}


// setting the classes for the different colors based on moment().hour()
function timeColor(){
    for (n=0; n< scheduleSpace.children().length; n++){
        var changeThisForm = $(document.body.children[1].children[n].children[0].children[1])
        if (n+9<moment().hour()){
            changeThisForm.removeClass("future")
            changeThisForm.removeClass("present")
            changeThisForm.addClass("past")
        }else if (n+9 > moment().hour()){
            changeThisForm.removeClass("past")
            changeThisForm.removeClass("present")
            changeThisForm.addClass("future")
        } else{
            changeThisForm.removeClass("past")
            changeThisForm.removeClass("future")
            changeThisForm.addClass("present")
        }
    }
    
}

function getToDos(){
    var parseThis = localStorage.getItem('toDos')
    toDos = JSON.parse(parseThis)
    for (n=0; n<scheduleSpace.children().length; n++){
        var setThisForm = $(document.body.children[1].children[n].children[0].children[1])
        var setThisText = toDos[n]
        setThisForm.val(setThisText)
    }
    console.log(toDos)
}

time()
setInterval(time, 1000);

timeColor();
setInterval(timeColor, 1000)

getToDos();

saveBtn.on('click', saveText);
