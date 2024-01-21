function askChatGPT() {
    console.log("ran function");
    const context = document.getElementById('description').value;
    const prompt = `Give me a weekly schedule based on the context provided. Provide the response as a JSON with days (use each day of the week) as the keys and schedule as the values. Here's an example: 
    {                 
        "Monday": [
          {
            "activity": "Workout",
            "time": "9:00 AM - 10:00 AM"
          },
          {
            "activity": "Assignment",
            "time": "10:00 AM - 12:00 PM"
          }
        ],
        "Tuesday": [
          {
            "activity": "Workout",
            "time": "9:00 AM - 10:00 AM"
          },
          {
            "activity": "Assignment",
            "time": "10:00 AM - 12:00 PM"
          }
        ],
        "Wednesday": [
          {
            "activity": "Lunch with Mother",
            "time": "12:00 PM - 3:00 PM"
          }
        ],
        "Thursday": [
        {
            "activity": "Lunch with Mother",
            "time": "12:00 PM - 3:00 PM"
        }
        ],
        "Friday": [
        {
            "activity": "Lunch with Mother",
            "time": "12:00 PM - 3:00 PM"
        }
        ],
        "Saturday": [
        {
            "activity": "Lunch with Mother",
            "time": "12:00 PM - 3:00 PM"
        }
        ],
        "Sunday": [
        {
            "activity": "Lunch with Mother",
            "time": "12:00 PM - 3:00 PM"
        }
        ]
      }`
    fetch(`http://localhost:3000/getChatGpt?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {

        console.log(data.content)
        updateCalendar(data.content)
    })
    .catch(err => console.log(err))
}

function showSurvey() {
    document.getElementById("calendar-page").style.display = "none"
    document.getElementById("survey-page").style.display = "block"
}

function updateCalendar(events) {
    const scheduleData = JSON.parse(events)
    console.log(scheduleData)

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.style.color = "white"

    // Iterate over each day in the scheduleData
    Object.keys(scheduleData).forEach(day => {
       const row = document.createElement('tr');
       const cell = document.createElement('td');

       // Display the day name
       cell.textContent = day;
       row.appendChild(cell);

       // Create a cell for each schedule item
       scheduleData[day].forEach(item => {
          const activityCell = document.createElement('td');
          activityCell.textContent = `${item.activity}: ${item.time}`;
          row.appendChild(activityCell);
       });

       // Append the row to the table body
       calendarBody.appendChild(row);
    });

    document.getElementById("calendar-page").style.display = "block"
    document.getElementById("survey-page").style.display = "none"

}



 