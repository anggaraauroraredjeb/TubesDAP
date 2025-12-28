document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  switch (page) {
    case "admin-cms":
      initAdminCMS();
      break;

    case "admin-events":
    case "admin-collections":
    case "admin-announcements":
      initAdminContent();
      break;

    case "cctv":
      initCCTV();
      break;

    case "layout":
      initLayout();
      break;

    case "tour":
      initVirtualTour();
      break;

    case "tour3d":
      initVirtualTour3D();
      break;
  }
});

/* ================= ADMIN CONTENT (EVENTS / COLLECTIONS / ANNOUNCEMENTS) ================= */

function initAdminContent() {
  console.log("Admin Content Page Loaded");

  const listKonten = document.getElementById("listKonten");
  const kategoriInput = document.getElementById("kategori");
  const judulInput = document.getElementById("judul");
  const deskripsiInput = document.getElementById("deskripsi");

  if (!listKonten || !kategoriInput || !judulInput || !deskripsiInput) return;

  window.tambahKonten = function () {
    const kategori = kategoriInput.value;
    const judul = judulInput.value.trim();
    const deskripsi = deskripsiInput.value.trim();

    if (!judul) {
      alert("Title cannot be empty");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>[${kategori}]</strong> ${judul}
        ${deskripsi ? `<br><small>${deskripsi}</small>` : ""}
      </span>
      <button class="danger" onclick="this.parentElement.remove()">Delete</button>
    `;

    listKonten.appendChild(li);

    judulInput.value = "";
    deskripsiInput.value = "";
  };
}

/* ================= ADMIN DASHBOARD ================= */

function initAdminCMS() {
  console.log("Admin CMS Page Loaded");
  initAdminContent();
}

/* ================= CCTV ================= */

function initCCTV() {
  console.log("CCTV Monitor loaded");
}

/* ================= PUBLIC PAGES ================= */

function initLayout() {
  console.log("Museum layout page");
}

function initVirtualTour() {
  console.log("Virtual Tour page");
}

function initVirtualTour3D() {
  console.log("3D Virtual Tour page");
}
