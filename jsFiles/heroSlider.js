fetch("https://opensheet.elk.sh/1oVwuDlwg7g-13UAW6Ih6OcnW8YPSWjtDZzm3kFSNiB4/General%20Photo%20Submission")
    .then(res => res.json())
    .then(data => {

        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

        const firstSix = sorted.slice(0, 6);

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
                    <a href="#">Learn More</a> 
                </div>
            `;

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