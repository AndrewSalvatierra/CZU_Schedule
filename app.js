const DAY_NAMES = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday" };

const ATTENDANCE = {
  required: { cls: "req",  label: "Attendance required" },
  partial:  { cls: "part", label: "75% attendance" },
  optional: { cls: "opt",  label: "Optional — not checked" },
};

const MANDATORY = ["required", "partial"];

// Teaching week number (1-based) for a given date, counting from SEMESTER.start.
function weekNumber(date) {
  const start = new Date(SEMESTER.start + "T00:00:00");
  const diff = date - start;
  if (diff < 0) return null;
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
}

function currentParity() {
  const n = weekNumber(new Date());
  if (!n) return null;
  return n % 2 === 1 ? "odd" : "even";
}

const state = {
  tab: "schedule",
  view: "day",                              // "day" | "week"
  week: currentParity() || "odd",
  onlyMandatory: false,
};

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function classesFor(day) {
  return CLASSES
    .filter((c) => c.day === day)
    .filter((c) => c.weeks === "every" || c.weeks === state.week)
    .filter((c) => !state.onlyMandatory || MANDATORY.includes(c.attendance))
    .sort((a, b) => a.start.localeCompare(b.start));
}

function classCard(c) {
  const course = COURSES[c.code];
  const a = ATTENDANCE[c.attendance];
  const room = ROOMS[c.room] || "";
  return `
    <article class="cls ${c.attendance === "optional" ? "is-optional" : ""}">
      <div class="time">${c.start}<span>${c.end}</span></div>
      <div>
        <h3>${esc(course.name)}</h3>
        <div class="code">${esc(c.code)} · ${esc(c.type)}</div>
        <p class="meta">📍 <b>${esc(c.room)}</b> — ${esc(room)}<br>👤 ${esc(c.teacher)}</p>
        ${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}
        <div class="badges"><span class="chip ${a.cls}">${a.label}</span></div>
      </div>
    </article>`;
}

function dayBlock(day, isToday) {
  const list = classesFor(day);
  const emptyMsg = state.onlyMandatory
    ? "Nothing mandatory."
    : day === 5 && state.week === "even"
      ? "No classes — even week."
      : "No classes.";
  return `
    <section class="day ${isToday ? "today" : ""}">
      <h2>${DAY_NAMES[day]}${isToday ? " — today" : ""}</h2>
      ${list.length ? list.map(classCard).join("") : `<p class="empty">${emptyMsg}</p>`}
    </section>`;
}

function render() {
  document.querySelectorAll("#viewpick button").forEach((b) =>
    b.classList.toggle("active", b.dataset.view === state.view));
  document.querySelectorAll("#weekpick button").forEach((b) =>
    b.classList.toggle("active", b.dataset.week === state.week));
  document.getElementById("onlyMandatory").checked = state.onlyMandatory;

  const dow = new Date().getDay();
  const host = document.getElementById("days");

  if (state.view === "day") {
    host.innerHTML = dow >= 1 && dow <= 5
      ? dayBlock(dow, true)
      : `<section class="day"><h2>${dow === 6 ? "Saturday" : "Sunday"} — today</h2>
           <p class="empty">Weekend. Switch to <strong>Whole week</strong> to see the rest.</p></section>`;
  } else {
    host.innerHTML = [1, 2, 3, 4, 5].map((d) => dayBlock(d, d === dow)).join("");
  }
}

function renderStatic() {
  document.getElementById("courses").innerHTML = Object.entries(COURSES)
    .map(([code, c]) => `
      <div class="course">
        <h3>${esc(c.name)}</h3>
        <div class="code">${esc(code)} · ${esc(c.completion)}</div>
        <p>${esc(c.dept)} · ${esc(c.guarantor)}</p>
        <p><b>Attendance:</b> ${esc(c.attendanceNote)}</p>
      </div>`)
    .join("");

  document.getElementById("rooms").innerHTML = Object.entries(ROOMS)
    .map(([k, v]) => `<li><b>${esc(k)}</b> — ${esc(v)}</li>`)
    .join("");

  const n = weekNumber(new Date());
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const off = DAYS_OFF.map((d) => d.date).join(", ");
  document.getElementById("now").textContent =
    n && n >= 1 && n <= 12
      ? `Today is ${today} — teaching week ${n} (${n % 2 ? "odd" : "even"}). Day off: ${off}.`
      : `Today is ${today} — outside the teaching period (${SEMESTER.start} to ${SEMESTER.end}).`;
}

document.querySelectorAll(".tabs button").forEach((b) =>
  b.addEventListener("click", () => {
    state.tab = b.dataset.tab;
    document.querySelectorAll(".tabs button").forEach((x) =>
      x.classList.toggle("active", x.dataset.tab === state.tab));
    document.getElementById("tab-schedule").hidden = state.tab !== "schedule";
    document.getElementById("tab-info").hidden = state.tab !== "info";
  }));

document.querySelectorAll("#viewpick button").forEach((b) =>
  b.addEventListener("click", () => { state.view = b.dataset.view; render(); }));

document.querySelectorAll("#weekpick button").forEach((b) =>
  b.addEventListener("click", () => { state.week = b.dataset.week; render(); }));

document.getElementById("onlyMandatory").addEventListener("change", (e) => {
  state.onlyMandatory = e.target.checked;
  render();
});

renderStatic();
render();
