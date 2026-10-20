fetch("https://opensheet.elk.sh/1hYcNs4Ujxq3B-DQhU9R45S_Hdw7_kuig66DgsnwzgfI/General%20Photo%20Submission")
    .then(res => res.json())
    .then(data => {

        const approved = data.filter(item => item.status === "Approved");

        const sorted = approved.sort((a, b) => a.name.localeCompare(b.name));

        const firstSix = sorted.slice(0, 5);

        const container = document.querySelector(".slide");

        firstSix.forEach(item => {
            const card = document.createElement("div");
            card.className = "item";

            card.innerHTML = `
                <div class="blur"></div>
                <img src="${item.image}" alt="">
                <div class="content">
                    <div class="name">${item.name}</div> 
                    <div class="description">${truncateWords(item.description, 20)}</div>
                    <a class="learnMore" href="#">Learn More</a> 
                </div>
            `;
            const learnMoreBtn = card.querySelector(".learnMore");
            learnMoreBtn.addEventListener("click", (e) => {e.preventDefault();
                document.getElementById('lightboxImage').src=item.image;
                document.getElementById("modalTitle").textContent = item.title;
                document.getElementById("modalName").textContent = item.name;
                document.getElementById("modalDescription").textContent = item.description;
                document.getElementById("modal").style.display = "flex";
            });
            document.getElementById("modal").addEventListener("click", () => {
                document.getElementById("modal").style.display = "none";
            });
            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading events:", err));

function truncateWords(text, limit) {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}

document.querySelectorAll(".slideBtn")[1].onclick = () => {
    let list = document.querySelectorAll(".item");
    document.querySelector('#slide').appendChild(list[0]);
}

document.querySelectorAll(".slideBtn")[0].onclick = () => {
    let list = document.querySelectorAll(".item");
    document.querySelector('#slide').prepend(list[list.length - 1]);
}