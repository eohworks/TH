// Content data — replace this array once the spreadsheet content is available.
const SECTIONS = [
  {
    name: "Cult of Luna",
    tag: "Member",
    open: false,
    rows: [
      { title: "Salvation", value: "2004" },
      { title: "Somewhere Along the Highway", value: "2006" },
      { title: "Eternal Kingdom", value: "2008" },
      { title: "Vertikal", value: "2013" },
      { title: "Mariner", value: "2016" },
      { title: "A Dawn to Fear", value: "2019" },
      { title: "The Long Road North", value: "2022" },
    ],
  },
  {
    name: "Deportees",
    tag: "Member",
    open: false,
    rows: [
      { title: "All Prayed Up", value: "2004" },
      { title: "Damaged Goods", value: "2006" },
      { title: "Under the Pavement – The Beach", value: "2009" },
      { title: "Islands & Shores", value: "2011" },
      { title: "The Big Sleep", value: "2015" },
      { title: "All Future", value: "2019" },
      { title: "People Are a Foreign Country", value: "2023" },
    ],
  },
  {
    name: "Vännäs Kasino",
    tag: "Member",
    open: false,
    rows: [
      { title: "Vännäs Kasino", value: "2023" },
      { title: "II", value: "2024" },
    ],
  },
  {
    name: "Phoenix",
    tag: "Touring and selected albums",
    open: false,
    rows: [{ range: { start: "2006", end: "present" } }],
  },
  {
    name: "Yung Lean",
    tag: "Touring",
    open: false,
    rows: [{ range: { start: "2025", end: "present" } }],
  },
  {
    name: "The Perishers",
    tag: "Member",
    open: false,
    rows: [
      { title: "From Nothing to One", value: "2002" },
      { title: "Let There Be Morning", value: "2003" },
      { title: "Victorious", value: "2007" },
    ],
  },
  {
    name: "Khoma",
    tag: "Member",
    open: false,
    rows: [
      { title: "Tsunami", value: "2004" },
      { title: "The Second Wave", value: "2006" },
      { title: "A Final Storm", value: "2010" },
      { title: "All Erodes", value: "2012" },
    ],
  },
  {
    name: "Remote Sessions",
    tag: "",
    dot: true,
    open: false,
    rows: [
      { title: "Chris Taylor", value: "" },
      { title: "Phoenix", value: "" },
      { title: "Charlie Hall (The War on Drugs)", value: "" },
      { title: "Joe Jonas", value: "" },
      { title: "Klara Keller", value: "" },
    ],
  },
];

const CHEVRON_TOGGLE_SVG = `
  <svg viewBox="0 0 16 8.5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.2548 1C11.3971 1 11.4996 1.1193 11.5 1.25C11.5001 1.2907 11.4903 1.33248 11.4688 1.37213L8.21388 7.3688C8.16725 7.45468 8.08363 7.5 8 7.5C7.91638 7.5 7.83265 7.4547 7.78603 7.3688L4.53115 1.37213C4.50963 1.33248 4.49988 1.2907 4.5 1.25C4.5004 1.1193 4.60278 1 4.74508 1H11.2548Z" fill="#888888"/>
  </svg>
`;

// IBM Carbon "arrow--right" icon (16px)
const ARROW_RIGHT_SVG = `
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.3 3.7 13.1 7.5 1 7.5 1 8.5 13.1 8.5 9.3 12.3 10 13 15 8 10 3z" fill="currentColor"/>
  </svg>
`;

function renderAccordion(sections) {
  const container = document.getElementById("accordion");
  container.innerHTML = "";

  sections.forEach((section, index) => {
    const item = document.createElement("div");
    item.className = "accordion-item";
    item.dataset.open = String(Boolean(section.open));

    const panelId = `accordion-panel-${index}`;

    const header = document.createElement("button");
    header.type = "button";
    header.className = "accordion-header";
    header.setAttribute("aria-expanded", String(Boolean(section.open)));
    header.setAttribute("aria-controls", panelId);
    header.innerHTML = `
      <span class="accordion-header__label">
        <span class="accordion-header__name">${section.name}</span>
        ${section.dot ? `<span class="accordion-header__dot"></span>` : ""}
        ${
          section.tag
            ? `<span class="accordion-header__separator">/</span>
        <span class="accordion-header__tag">${section.tag}</span>`
            : ""
        }
      </span>
      <span class="accordion-header__chevron">${CHEVRON_TOGGLE_SVG}</span>
    `;
    header.addEventListener("click", () => {
      const isOpen = item.dataset.open === "true";
      item.dataset.open = String(!isOpen);
      header.setAttribute("aria-expanded", String(!isOpen));
    });

    const panelWrapper = document.createElement("div");
    panelWrapper.className = "accordion-panel-wrapper";
    panelWrapper.id = panelId;

    const panel = document.createElement("table");
    panel.className = "accordion-panel";
    const tbody = document.createElement("tbody");
    section.rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = row.range
        ? `<td colspan="2">
             <span class="row-range">
               <span class="row-range__start-group">
                 <span class="row-range__start">${row.range.start}</span>
                 <span class="row-range__chevron">${ARROW_RIGHT_SVG}</span>
               </span>
               <span class="row-range__end">${row.range.end}</span>
             </span>
           </td>`
        : `<td>${row.title}</td><td>${row.value}</td>`;
      tbody.appendChild(tr);
    });
    panel.appendChild(tbody);
    panelWrapper.appendChild(panel);

    item.appendChild(header);
    item.appendChild(panelWrapper);
    container.appendChild(item);
  });
}

renderAccordion(SECTIONS);

function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const sync = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    toggle.setAttribute("aria-checked", String(isLight));
    toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  };

  sync();

  toggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sync();
  });
}

initThemeToggle();
