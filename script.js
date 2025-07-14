document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.getElementById("daysGrid");
  const modal = document.getElementById("reportModal");
  const closeModalBtn = document.getElementById("closeModal");
  const reportTextarea = document.getElementById("reportTextarea");
  const reportLinkInput = document.getElementById("reportLink");
  const viewReportBtn = document.getElementById("viewReportBtn");
  const saveReportBtn = document.getElementById("saveReportBtn");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const modalDayTitle = document.getElementById("modalDayTitle");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const searchInput = document.getElementById("searchDays");
  const toggleThemeBtn = document.getElementById("toggleThemeBtn");

  let currentDay = null;

  // Generate Day Cards
  for (let i = 1; i <= 30; i++) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");
    dayCard.setAttribute("data-day", i);

    const dayTitle = document.createElement("h4");
    dayTitle.textContent = `Day ${i}`;

    const dayStatus = document.createElement("p");
    const reportKey = `report_day_${i}`;
    if (localStorage.getItem(reportKey)) {
      dayStatus.textContent = "✅ Completed";
      dayCard.classList.add("completed");
    } else {
      dayStatus.textContent = "🕒 Not Completed";
    }

    dayCard.appendChild(dayTitle);
    dayCard.appendChild(dayStatus);

    dayCard.addEventListener("click", () => openModal(i));
    daysContainer.appendChild(dayCard);
  }

  updateProgress();

  // Open modal
  function openModal(day) {
    currentDay = day;
    modalDayTitle.textContent = `Day ${day} Report`;

    // Load saved report
    const savedText = localStorage.getItem(`report_day_${day}`) || "";
    reportTextarea.value = savedText;

    // Load saved PDF link
    const savedLink = localStorage.getItem(`report_link_day_${day}`) || "";
    reportLinkInput.value = savedLink;

    if (savedLink) {
      viewReportBtn.style.display = "inline-block";
      viewReportBtn.href = savedLink;
    } else {
      viewReportBtn.style.display = "none";
    }

    modal.style.display = "flex";
  }

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Save Report
  saveReportBtn.addEventListener("click", () => {
    if (currentDay) {
      const text = reportTextarea.value.trim();
      localStorage.setItem(`report_day_${currentDay}`, text);

      const pdfLink = reportLinkInput.value.trim();
      localStorage.setItem(`report_link_day_${currentDay}`, pdfLink);

      // Show/hide View PDF button
      if (pdfLink) {
        viewReportBtn.style.display = "inline-block";
        viewReportBtn.href = pdfLink;
      } else {
        viewReportBtn.style.display = "none";
      }

      // Update card visually
      const card = document.querySelector(`.day-card[data-day='${currentDay}']`);
      const status = card.querySelector("p");
      if (text) {
        card.classList.add("completed");
        status.textContent = "✅ Completed";
      } else {
        card.classList.remove("completed");
        status.textContent = "🕒 Not Completed";
      }
      modal.style.display = "none";
      updateProgress();
    }
  });

  // Download PDF
  downloadPdfBtn.addEventListener("click", () => {
    if (currentDay) {
      const text = reportTextarea.value.trim();
      if (!text) {
        alert("Report is empty!");
        return;
      }
      // Create PDF as a Blob (simple text-based PDF)
      const blob = new Blob([text], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Day${currentDay}_Report.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });

  // Update progress bar
  function updateProgress() {
    let completed = 0;
    for (let i = 1; i <= 30; i++) {
      if (localStorage.getItem(`report_day_${i}`)) {
        completed++;
      }
    }
    const percent = (completed / 30) * 100;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${completed} / 30 Days Completed`;
  }

  // Search/filter days
  searchInput.addEventListener("keyup", () => {
    const val = searchInput.value.toLowerCase();
    document.querySelectorAll(".day-card").forEach(card => {
      const title = card.querySelector("h4").textContent.toLowerCase();
      if (title.includes(val)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Theme toggle
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      toggleThemeBtn.textContent = "☀️ Theme";
    } else {
      toggleThemeBtn.textContent = "🌙 Theme";
    }
  });
});
