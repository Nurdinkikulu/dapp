// Inapakia matukio yaliyohifadhiwa kutoka kwenye localStorage wakati wa ku-load page
document.addEventListener('DOMContentLoaded', function() {
  loadEvents();
});

document.getElementById("addEventBtn").addEventListener("click", function() {
  let date = document.getElementById("dateInput").value;
  let event = document.getElementById("eventInput").value;

  if (date && event) {
    addEvent(date, event);
  } else {
    alert("Please fill in both the date and event.");
  }
});

function addEvent(date, event) {
  let eventsList = document.getElementById("eventsList");

  let li = document.createElement("li");

  let eventText = document.createElement("span");
  eventText.textContent = `${date}: ${event}`;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function() {
    deleteEvent(date, event);
    eventsList.removeChild(li);
  });

  li.appendChild(eventText);
  li.appendChild(deleteBtn);
  eventsList.appendChild(li);

  // Save event to localStorage
  saveEventToStorage(date, event);

  // Clear inputs after adding
  document.getElementById("dateInput").value = "";
  document.getElementById("eventInput").value = "";
}

// Hifadhi tukio kwenye localStorage
function saveEventToStorage(date, event) {
  let events = getEventsFromStorage();
  events.push({ date, event });
  localStorage.setItem('events', JSON.stringify(events));
}

// Pata matukio yaliyohifadhiwa kutoka kwenye localStorage
function getEventsFromStorage() {
  let events = localStorage.getItem('events');
  if (events) {
    return JSON.parse(events);
  } else {
    return [];
  }
}

// Onyesha matukio yaliyohifadhiwa kwenye ukurasa
function loadEvents() {
  let events = getEventsFromStorage();
  let eventsList = document.getElementById("eventsList");

  events.forEach(function(eventItem) {
    let li = document.createElement("li");

    let eventText = document.createElement("span");
    eventText.textContent = `${eventItem.date}: ${eventItem.event}`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function() {
      deleteEvent(eventItem.date, eventItem.event);
      eventsList.removeChild(li);
    });

    li.appendChild(eventText);
    li.appendChild(deleteBtn);
    eventsList.appendChild(li);
  });
}

// Futa tukio kutoka kwenye localStorage
function deleteEvent(date, event) {
  let events = getEventsFromStorage();
  events = events.filter(e => !(e.date === date && e.event === event));  // Filtraji kwa kuondoa tukio linalofutwa
  localStorage.setItem('events', JSON.stringify(events));
}