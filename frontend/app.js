const API = "http://127.0.0.1:5000/api/events";

// Load events
async function loadEvents() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("events");
  container.innerHTML = "";

  data.events.forEach(event => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <p>📍 ${event.location}</p>
      <p>💰 R${event.price}</p>
    `;

    container.appendChild(div);
  });
}

// Create event
async function createEvent() {
  const event = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    location: document.getElementById("location").value,
    price: document.getElementById("price").value,
    organiserId: "123"
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  });

  loadEvents();
}

// Start
loadEvents();
