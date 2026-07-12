// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for the team.
// To add / edit / remove a member, change ONLY this array. Every place that
// shows the team (home page preview + team.html) re-renders from here.
// Each member also has its own profile page (the `profile` field) which is the
// one file still edited by hand.
// ─────────────────────────────────────────────────────────────────────────────
const MILLAE_TEAM = [
  {
    name: "Ray Sun",
    role: "Founding Researcher",
    blurb: "Leading Millae's research program, building on his background in reinforcement learning.",
    photo: "assets/ray-sun.jpg",
    profile: "ray.html",
  },
  {
    name: "Junsoo Byun",
    role: "Founding Researcher",
    blurb: "Working on the founding team with experience in LLMs and an interest in neuroscience.",
    photo: "assets/junsoo-byun.jpg",
    profile: "junsoo.html",
  },
  {
    name: "Hyungju Lee",
    role: "Founding Researcher",
    blurb: "Working alongside the founding team based on experience in time-series diffusion models.",
    initials: "HL",
    profile: "hyungju.html",
  },
  {
    name: "Lynn Won",
    role: "Financial Consultant",
    blurb: "Managing Millae's finances so we can go the furthest with what we have.",
    initials: "LW",
    profile: "lynn.html",
  },
  {
    name: "Jimin Han",
    role: "Designer",
    blurb: "Shaping Millae's brand and visual identity.",
    photo: "assets/jimin-han.jpg",
    profile: "jimin.html",
  },
  {
    openRole: true,
    name: "Founding Researcher",
    role: "Open Role",
    blurb: "We're looking for an experienced researcher to join as a cofounder.",
    linkText: "See the role →",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Rendering. Any element with [data-team-grid] gets filled with the cards above.
// ─────────────────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function teamAvatarHtml(member) {
  if (member.openRole) {
    return '<div class="avatar">+</div>';
  }
  if (member.photo) {
    return `<div class="avatar"><img src="${escapeHtml(member.photo)}" alt="${escapeHtml(member.name)}"></div>`;
  }
  return `<div class="avatar">${escapeHtml(member.initials || "")}</div>`;
}

function teamCardHtml(member, onIndex) {
  const avatar = teamAvatarHtml(member);
  const name = escapeHtml(member.name);
  const role = escapeHtml(member.role);
  const blurb = escapeHtml(member.blurb);

  if (member.openRole) {
    // On the home page the hiring section is on the same page (#hiring);
    // elsewhere it lives on index.html.
    const href = onIndex ? "#hiring" : "index.html#hiring";
    const linkText = escapeHtml(member.linkText || "See the role →");
    return `<div class="team-card open-role">
        ${avatar}
        <h3>${name}</h3>
        <span class="team-role">${role}</span>
        <p>${blurb}</p>
        <a href="${escapeHtml(href)}" class="link-arrow">${linkText}</a>
      </div>`;
  }

  return `<div class="team-card">
        ${avatar}
        <h3>${name}</h3>
        <span class="team-role">${role}</span>
        <p>${blurb}</p>
        <a href="${escapeHtml(member.profile)}" class="link-arrow">View profile →</a>
      </div>`;
}

function renderTeam() {
  const grids = document.querySelectorAll("[data-team-grid]");
  if (!grids.length) return;
  const onIndex = !!document.getElementById("hiring");
  const html = MILLAE_TEAM.map((m) => teamCardHtml(m, onIndex)).join("\n      ");
  grids.forEach((grid) => {
    grid.innerHTML = html;
  });
}

document.addEventListener("DOMContentLoaded", renderTeam);
