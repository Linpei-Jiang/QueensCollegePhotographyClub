fetch("https://opensheet.elk.sh/1hYcNs4Ujxq3B-DQhU9R45S_Hdw7_kuig66DgsnwzgfI/News%20&%20Updates")
    .then(res => res.json())
    .then(data => {
        const sorted = data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        const latestThree = sorted.slice(0, 4);

        const grid = document.querySelector(".newsUpdatesGrid");

        latestThree.forEach(item => {
            const slug = slugify(item.title);
            const card = document.createElement("a");
            card.href = `otherHTML/newsDetail.html?title=${slug}`;
            card.target = "_blank";

            card.innerHTML = `
        <div class="newsUpdatesGridCard">
          <div class="newsUpdatesGridCardImage"
               style="background-image: url('${item.image}');"></div>
          <h3>${item.title}</h3>
          <p>${truncateWords(item.description, 20)}</p>
          <hr>
          <div class="newsUpdatesGridCardNewsOrUpdatesDates">
            <p>${item.date}</p>
            <p>Editor: ${item.editor}</p>
          </div>
        </div>
      `;
            grid.appendChild(card);
        });
    });

function slugify(text) {
    return text.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

function truncateWords(text, limit) {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}

