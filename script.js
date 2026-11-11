// The discography is rendered as static HTML in index.html (so crawlers and
// link previews can read it). This script only handles opening and closing.
document.querySelectorAll(".accordion-item").forEach((item) => {
  const header = item.querySelector(".accordion-header");
  header.addEventListener("click", () => {
    const isOpen = item.dataset.open === "true";
    item.dataset.open = String(!isOpen);
    header.setAttribute("aria-expanded", String(!isOpen));
  });
});
