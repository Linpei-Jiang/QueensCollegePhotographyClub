fetch("https://opensheet.elk.sh/1hYcNs4Ujxq3B-DQhU9R45S_Hdw7_kuig66DgsnwzgfI/News%20&%20Updates")
    .then(res => res.json())
    .then(data => {
        // Sort newest → oldest
        const sorted = data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        renderPage(sorted, currentPage);
        renderPagination(sorted);
    });

const itemsPerPage = 10;
let currentPage = 1;

function renderPage(data, page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);

    const grid = document.querySelector(".newsUpdatesGrid");
    grid.innerHTML = "";

    paginatedItems.forEach(item => {
        const card = document.createElement("a");
        card.href = `otherHTML/newsDetail.html?title=${slugify(item.title)}`;
        card.target = "_blank";
        card.innerHTML = `
      <div class="newsUpdatesGridCard">
        <div class="newsUpdatesGridCardImage" style="background-image:url('${item.image}')"></div>
        <h2>${item.title}</h2>
        <p>${truncateWords(item.description, 25)}</p>
        <hr>
        <div class="newsUpdatesGridCardNewsOrUpdatesDates">
          <p>${item.date}</p>
          <p>${item.editor}</p>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
}

function renderPagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = (i === currentPage) ? "active" : "";
        btn.addEventListener("click", () => {
            currentPage = i;
            renderPage(data, currentPage);
            renderPagination(data);
        });
        pagination.appendChild(btn);
    }
}


function slugify(text) {
    return text.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

function truncateWords(text, limit) {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}
