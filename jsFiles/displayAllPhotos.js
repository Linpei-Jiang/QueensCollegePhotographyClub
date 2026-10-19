fetch("https://opensheet.elk.sh/1hYcNs4Ujxq3B-DQhU9R45S_Hdw7_kuig66DgsnwzgfI/General%20Photo%20Submission")
    .then(res => res.json())
    .then(data => {
        const approved = data.filter(item => item.status === "Approved");
        // Sort newest → oldest
        const sorted = approved.sort((a, b) => a.name.localeCompare(b.name));

        renderPage(sorted, currentPage);
        renderPagination(sorted);
    });

const itemsPerPage = 10;
let currentPage = 1;

function renderPage(data, page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);

    const grid = document.querySelector(".allPhotographsGrid");
    grid.innerHTML = "";

    paginatedItems.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("photoCard");
        card.style.backgroundImage = "url(" + item.image + ")";
        card.addEventListener("click", () => {
            openLightbox(item);
        });
        card.innerHTML = `
        <div class="darkBackground"></div>
      
    `;
        grid.appendChild(card);
    });
}

function openLightbox(item) {
    document.getElementById('lightboxImage').src=item.image;
    document.getElementById('lightboxName').textContent=item.title || 'Untitled Photo';
    document.getElementById('lightboxPhotographer').textContent=item.name || 'Unknown';
    document.getElementById("lightboxDescription").textContent = item.description || "No description provided.";    document.getElementById('lightbox').classList.add('active');
    document.getElementById("lightboxSocial").textContent = item.social || "No social provided.";    document.getElementById('lightbox').classList.add('active');
}
document.getElementById('closeLightbox').addEventListener('click',()=>{
    document.getElementById('lightbox').classList.remove('active');
});
document.getElementById('lightbox').addEventListener('click',(e)=>{
    if(e.target.id==='lightbox'){
        document.getElementById('lightbox').classList.remove('active');
    }
});
card.addEventListener('click',()=>{
    openLightbox(item);
});

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
