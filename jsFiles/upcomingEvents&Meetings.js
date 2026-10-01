fetch("https://opensheet.elk.sh/1hYcNs4Ujxq3B-DQhU9R45S_Hdw7_kuig66DgsnwzgfI/Upcoming%20Events%20&%20Meetings")
    .then(res => res.json())
    .then(data => {
        // Today at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data.filter(item => {
            const [yy, mm, dd] = item.date.split("/");
            const fullYear = 2000 + Number(yy);
            const eventDate = new Date(fullYear, mm - 1, dd);

            return eventDate >= today;
        });

        // Sort by date (soonest first)
        const sorted = upcoming.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        // Take only the first 4
        const firstFour = sorted.slice(0, 4);

        const container = document.querySelector(".upcomingEventsUpdates");

        firstFour.forEach(item => {
            const card = document.createElement("a");
            card.href = item.link;
            card.target = "_blank";
            card.className = "upcomingEventsUpdatesCard";

            card.innerHTML = `
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <p class="evemtsDetailsLocation">${item.location}</p>
              <div class="eventDetails">
                  <p class="eventsDetailsDate">${item.date}</p>
                  <p class="eventsDetailsTime">${item.time}</p>
              </div>
      `;

            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading events:", err));