var calendarContent = "";
var lastDayOfTheMonth = 4;
var currentDateArray = new Date().toString().split(" ");
var currentSelectedDate =
currentDateArray[2] + "-" + currentDateArray[1] + "-" + currentDateArray[3];
var taskValue = JSON.parse(localStorage.getItem(currentSelectedDate));

addCalendarTables();
//By default, current date's scheduled tasks will be displayed
addTasksHeaderContent();
showTasks(null,taskValue);

document.querySelector("#\\00003"+currentSelectedDate).classList.add("blue-background");

document
  .querySelector(`.m-${new Date().getFullYear()}-${new Date().getMonth()}`)
  .classList.add("active");

function deleteTaskOnClick(){  

$(".cancel-icon").on("click", function () {

  console.log("cancelled!!!");
  var temp = JSON.parse(localStorage.getItem(currentSelectedDate));
  var taskNo = parseInt(this.getAttribute("class").slice(17));
  console.log(taskNo);
  temp.splice(taskNo, 1);
  console.log(temp);
  localStorage.setItem(currentSelectedDate, JSON.stringify(temp));

  showTasks(null, temp);
});
}

// Letting the user add tasks on different dates

$(".date").on("click", function () {
  document.querySelector("#\\00003"+currentSelectedDate).classList.remove("blue-background");
  currentSelectedDate = this.getAttribute("id"); 
  document.querySelector("#\\00003"+currentSelectedDate).classList.add("blue-background");
  taskValue = JSON.parse(localStorage.getItem(this.getAttribute("id")));
  addTasksHeaderContent();
  showTasks(null, taskValue);
  var task = prompt("Add a task");
  console.log(task);
  showTasks(task, taskValue);
});

//Deleting the scheduled tasks when user clicks on cancel icon

//Utility fn. to take a task from user and add it to local storage for a particular date and show those on html page

function showTasks(task, taskValue) {
  if (task != null) {
    if (taskValue == null) {
      taskValue = [task];
      localStorage.setItem(currentSelectedDate, JSON.stringify(taskValue));
    } else {
      taskValue.push(task);
      localStorage.setItem(currentSelectedDate, JSON.stringify(taskValue));
    }
  }
  displayTaskContent(taskValue);
}

//Utility fn. to display tasks on html page

function displayTaskContent(taskValue) {
  var taskContent = "";
  for (var i = 0; taskValue != null && i < taskValue.length; i++) {
    taskContent +=
      "<div class='tasks-elem'><p>" +
      taskValue[i] +
      `</p><img class='cancel-icon task-${i}' src='cancel.png'></div>`;
  }

  if (taskValue != null && taskValue.length!=0) {
    taskContent = "<div class='tasks-list'>" + taskContent + "</div>";
    document.querySelector(".tasks-body").innerHTML = taskContent;
    deleteTaskOnClick();
  } else {
    document.querySelector(".tasks-body").innerHTML = "No tasks yet !";
  }
}
//Utility fn. to add Tasks header content

function addTasksHeaderContent() {
  var currDateArray = currentSelectedDate.split("-");
  var currDate =
    currDateArray[1] + " " + currDateArray[0] + ", " + currDateArray[2];
  document.querySelector(".tasks-header").textContent =
    "Scheduled tasks as on " + currDate;
}
// Fn. to add Content on the web page
function addCalendarTables() {
  for (var i = 2022; i <= 2030; i++) {
    for (var j = 0; j <= 11; j++) {
      generateTable(i, j);
    }
  }
  addBootstrapCarousel();
  document.querySelector(".full-calendar").innerHTML = calendarContent;
}

// Complete logic for genarating calendar with dates using JS's Date object
function generateTable(year, month) {
  var tableContent =
    "<tr class='month-names'><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>";
  var d = new Date(year, month, 1);
  var count = 1;
  while (d.getMonth() != (month + 1) % 12) {
    var tableRow = "";
    for (var i = 0; i <= 6; i++) {
      if (
        (count == 1 && i <= lastDayOfTheMonth && lastDayOfTheMonth != 6) ||
        d.getMonth() == (month + 1) % 12
      ) {
        tableRow += "<td></td>";
      } else {
        var dateStr = d.toString();
        var day = dateStr.split(" ")[2];
        tableRow +=
          "<td class='date' id='" +
          d.toString().split(" ")[2] +
          "-" +
          d.toString().split(" ")[1] +
          "-" +
          d.getFullYear() +
          "' >" +
          day +
          "</td>";
        if (giveNextDate(d).getMonth() == (month + 1) % 12) {
          lastDayOfTheMonth = i;
        }
        d.setDate(d.getDate() + 1);
      }
    }
    tableRow = "<tr>" + tableRow + "</tr>";
    tableContent += tableRow;
    count++;
  }
  d.setDate(d.getDate() - 1);
  var monthName = d.toString().split(" ")[1];
  var table =
    "<div class='carousel-item m-" +
    d.getFullYear() +
    "-" +
    d.getMonth() +
    "'><table><tr><th class='calendar-header' colspan='7'>" +
    monthName +
    " " +
    year +
    "</th></tr>" +
    tableContent +
    "</table></div>";
  calendarContent += table;
}

//Utility function to get the next date
function giveNextDate(date) {
  var temp = new Date(date.toString());
  temp.setDate(temp.getDate() + 1);
  return temp;
}

//Fn. to add Bootstrap's carousel
function addBootstrapCarousel() {
  calendarContent =
    `<div id="carouselExampleControls" class="carousel slide" data-interval="false">
  <div class="carousel-inner">` +
    calendarContent +
    `</div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;
}
