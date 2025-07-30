document.addEventListener("DOMContentLoaded", () => {

  // ✅ HARDCODE YOUR DATA HERE
  const reports = {
    1: { text: `Topic: Introduction to Python Programming\n\nPython is a beginner-friendly, high-level language widely used in AI, data science, automation, and web development. On Day 1, I focused on basic syntax and logic building using simple programs.`, pdfLink: "https://1drv.ms/w/c/1569aa985bd1bf5d/EeHZsNFYYzpAm4-1XEEyEXkBOEX-IJbrk6ts0izMuY5yqQ?e=51PIwg" },
    2: { text: "TOPIC : Python loops and basic programs.", pdfLink: "day2Training.pdf" },
    3: { text: "On Day 3 of our training, we delved into AI & ML basics with Pandas and Kaggle.", pdfLink: "day3.pdf" },
    4: { text: "Intro to ML principles + regression model with California Housing Dataset.", pdfLink: "day4Training.pdf" },
    5: { text: "Classification problems: Predicting categories vs regression.", pdfLink: "day5Training.pdf" },
    6: { text: "Logistic Regression with Iris CSV dataset, realistic project feel.", pdfLink: "day6Training.pdf" },
    7: { text: "KNN & SVM classification on Iris dataset with visual comparisons.", pdfLink: "day7Training.pdf" },
    8: { pdfLink: "day8Training.pdf" }, 9: { pdfLink: "day9Training.pdf" }, 10: { pdfLink: "day10Training.pdf" },
    11: { pdfLink: "day11Training.pdf" }, 12: { pdfLink: "day12Training.pdf" }, 13: { pdfLink: "day13Training.pdf" },
    14: { pdfLink: "day14Training.pdf" }, 15: { pdfLink: "day15Training.pdf" }, 16: { pdfLink: "day16Training.pdf" },
    17: { pdfLink: "day17Training.pdf" }, 18: { pdfLink: "day18Training.pdf" }, 19: { pdfLink: "day19Training.pdf" },
    20: { pdfLink: "day20Training.pdf" }, 21: { pdfLink: "day21Training.pdf" }
  };

  // ✅ HARD CODED CERTIFICATE AND FINAL REPORT LINKS
  const certificateLinkFixed = "https://your-certificate-link.pdf";
  const finalReportLinkFixed = "finalReport.pdf";

  // DOM Elements
  const daysContainer = document.getElementById("daysGrid");
  const modal = document.getElementById("reportModal");
  const closeModalBtn = document.getElementById("closeModal");
  const reportTextarea = document.getElementById("reportTextarea");
  const reportLinkInput = document.getElementById("reportLink");
  const viewReportBtn = document.getElementById("viewReportBtn");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const modalDayTitle = document.getElementById("modalDayTitle");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const searchInput = document.getElementById("searchDays");
  const toggleThemeBtn = document.getElementById("toggleThemeBtn");

  const certificateBtn = document.getElementById("certificateBtn");
  const finalReportBtn = document.getElementById("finalReportBtn");

  let currentDay = null;

  // Generate Day Cards
  for (let i = 1; i <= 21; i++) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");
    dayCard.setAttribute("data-day", i);

    const dayTitle = document.createElement("h4");
    dayTitle.textContent = `Day ${i}`;

    const dayStatus = document.createElement("p");
    if (reports[i]) {
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

  // === Day Report Modal (READ-ONLY) ===
  function openModal(day) {
    currentDay = day;
    modalDayTitle.textContent = `Day ${day} Report`;

    // Set text & make read-only
    reportTextarea.value = reports[day]?.text || "No report available.";
    reportTextarea.readOnly = true;

    // Set PDF link & read-only input
    reportLinkInput.value = reports[day]?.pdfLink || "";
    reportLinkInput.readOnly = true;

    // Show PDF button if link available
    if (reports[day]?.pdfLink) {
      viewReportBtn.style.display = "inline-block";
      viewReportBtn.href = reports[day].pdfLink;
    } else {
      viewReportBtn.style.display = "none";
    }

    modal.style.display = "flex";
  }

  closeModalBtn.addEventListener("click", () => modal.style.display = "none");

  // === Certificate Button (Direct Link) ===
  certificateBtn.addEventListener("click", () => {
    window.open(certificateLinkFixed, "_blank"); // Direct open
  });

  // === Final Report Button (Direct Link) ===
  finalReportBtn.addEventListener("click", () => {
    window.open(finalReportLinkFixed, "_blank"); // Direct open
  });

  // Download PDF of Day Report
  downloadPdfBtn.addEventListener("click", () => {
    if (currentDay) {
      const text = reportTextarea.value.trim();
      if (!text) return alert("Report is empty!");
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

  // Progress Update
  function updateProgress() {
    let completed = Object.keys(reports).length;
    progressBar.style.width = `${(completed / 21) * 100}%`;
    progressText.textContent = `${completed} / 30 Days Completed`;
  }

  // Search Days
  searchInput.addEventListener("keyup", () => {
    const val = searchInput.value.toLowerCase();
    document.querySelectorAll(".day-card").forEach(card => {
      card.style.display = card.querySelector("h4").textContent.toLowerCase().includes(val) ? "block" : "none";
    });
  });

  // Theme Toggle
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Theme" : "🌙 Theme";
  });
});
