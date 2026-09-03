export async function loadComponent(selector, file, callback) {
    // variable container = the header/footer
    const container = document.querySelector(selector);
    // if the container doesn't exist then don't do anything
    if (!container) return;

    // try to see if the file given exist
    try {
        const response = await fetch(file);
        const html = await response.text();
        container.innerHTML = html;

        if (typeof callback === "function") {
            callback();
        }
        // this means file doesn't exist or something is going on, throughout an error
    } catch (err) {
        console.error(`Error loading ${file}:`, err);
    }
}