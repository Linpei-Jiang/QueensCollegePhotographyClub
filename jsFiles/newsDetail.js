function slugify(text) {
    return text.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

const params = new URLSearchParams(window.location.search);
const slug = params.get("title");

fetch("https://opensheet.elk.sh/1hYcNs4Ujxq3B-DQhU9R45S_Hdw7_kuig66DgsnwzgfI/News%20&%20Updates")
    .then(res => res.json())
    .then(data => {
        const item = data.find(n => slugify(n.title) === slug);

        if (item) {
            document.getElementById("newsDetail").innerHTML = `
        <div class="newsDetailCard">
          <button onclick="window.close()">← Back To Home</button>
          <h1>${item.title}</h1>
          <p>${item.date}</p>
          <img src="${item.image}">
          <p>${item.description}</p>
          <p class="editor">Edited By: ${item.editor}</p>
        </div>
      `;
        } else {
            document.getElementById("newsDetail").innerHTML = `<p>News item not found.</p>`;
        }
    });
