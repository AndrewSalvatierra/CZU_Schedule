const DAY_NAMES = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday" };

const ATTENDANCE = {
  required: { cls: "req",   label: "Attendance required" },
  partial:  { cls: "part",  label: "75% attendance" },
  optional: { cls: "opt",   label: "Optional — not checked" },
  elective: { cls: "elect", label: "Elective sport" },
};

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

let week = currentParity() || "odd";

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function classCard(c) {
  const course = COURSES[c.code];
  const a = ATTENDANCE[c.attendance];
  const room = ROOMS[c.room] || "";
  return `
    <article class="cls ${c.attendance === "optional" || c.attendance === "elective" ? "is-optional" : ""}">
      <div class="time">${c.start}<span>${c.end}</span></div>
      <div>
        <h3>${esc(course.name)}</h3>
        <div class="code">${esc(c.code.replace("_1", "_1"))} · ${esc(c.type)}</div>
        <p class="meta">📍 <b>${esc(c.room)}</b> — ${esc(room)}<br>👤 ${esc(c.teacher)}</p>
        ${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}
        <div class="badges"><span class="chip ${a.cls}">${a.label}</span></div>
      </div>
    </article>`;
}

function render() {
  document.querySelectorAll(".weekpick button").forEach((b) =>
    b.classList.toggle("active", b.dataset.week === week)
  );

  const todayDow = new Date().getDay();
  const out = [];

  for (const day of [1, 2, 3, 4, 5]) {
    const list = CLASSES
      .filter((c) => c.day === day && (c.weeks === "every" || c.weeks === week))
      .sort((a, b) => a.start.localeCompare(b.start));

    out.push(`
      <section class="day ${day === todayDow ? "today" : ""}">
        <h2>${DAY_NAMES[day]}${day === todayDow ? " — today" : ""}</h2>
        ${list.length
          ? list.map(classCard).join("")
          : `<p class="empty">No classes${day === 5 && week === "even" ? " — even week, free day 🎉" : ""}.</p>`}
      </section>`);
  }

  document.getElementById("days").innerHTML = out.join("");
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

  document.getElementById("sport").innerHTML = SPORT
    .map((s) => `<li><b>${s.start}–${s.end}</b> · ${esc(s.sport)} · ${esc(s.room)} · ${esc(s.teacher)}</li>`)
    .join("");

  const n = weekNumber(new Date());
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const off = DAYS_OFF.map((d) => d.date).join(", ");
  document.getElementById("now").textContent =
    n && n >= 1 && n <= 12
      ? `Today is ${today} — teaching week ${n} (${n % 2 ? "odd" : "even"}). Day off: ${off}.`
      : `Today is ${today} — outside the teaching period (${SEMESTER.start} to ${SEMESTER.end}).`;
}

document.querySelectorAll(".weekpick button").forEach((b) =>
  b.addEventListener("click", () => { week = b.dataset.week; render(); })
);

renderStatic();
render();
