const API = "http://127.0.0.1:5000/api/events";

async function loadEvents() {
  try {
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

  } catch (err) {
    console.log("Error:", err);
  }
}

loadEvents();
