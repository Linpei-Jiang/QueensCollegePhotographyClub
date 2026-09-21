document.getElementById("photoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file").files[0];
    const reader = new FileReader();

    reader.onload = async function() {
        const base64Data = reader.result.split(",")[1];
        const payload = {
            name: document.getElementById("name").value,
            year: document.getElementById("year").value,
            social: document.getElementById("social").value,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            filename: fileInput.name,
            mimeType: fileInput.type,
            file: base64Data,
            consent: document.getElementById("consent").value
        };

        await fetch("https://script.google.com/macros/s/AKfycbyraMovAEM96hcy7G8lXkq2WWAKyu4ly4rrpO3hjysI-GzTxmad2uiZvZYiNm-hncPmeg/exec", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
            mode: "no-cors" // avoids CORS block
        });

        alert("Submitted! Your photo will be live after review!");
        location.reload();
    };

    reader.readAsDataURL(fileInput);
});