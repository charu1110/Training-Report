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

  // DOM Elements
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

  // Certificate & Final Report Modals
  const certificateBtn = document.getElementById("certificateBtn");
  const certificateModal = document.getElementById("certificateModal");
  const closeCertificate = document.getElementById("closeCertificate");
  const certificateLink = document.getElementById("certificateLink");
  const saveCertificateBtn = document.getElementById("saveCertificateBtn");
  const viewCertificateBtn = document.getElementById("viewCertificateBtn");

  const finalReportBtn = document.getElementById("finalReportBtn");
  const finalReportModal = document.getElementById("finalReportModal");
  const closeFinalReport = document.getElementById("closeFinalReport");
  const finalReportLink = document.getElementById("finalReportLink");
  const saveFinalReportBtn = document.getElementById("saveFinalReportBtn");
  const viewFinalReportBtn = document.getElementById("viewFinalReportBtn");

  let currentDay = null;

  // Generate Day Cards
  for (let i = 1; i <= 21; i++) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");
    dayCard.setAttribute("data-day", i);

    const dayTitle = document.createElement("h4");
    dayTitle.textContent = `Day ${i}`;

    const dayStatus = document.createElement("p");
    const reportKey = `report_day_${i}`;
    if (localStorage.getItem(reportKey) || reports[i]) {
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

  // === Day Report Modal ===
  function openModal(day) {
    currentDay = day;
    modalDayTitle.textContent = `Day ${day} Report`;
    reportTextarea.value = localStorage.getItem(`report_day_${day}`) || reports[day]?.text || "";
    reportLinkInput.value = localStorage.getItem(`report_link_day_${day}`) || reports[day]?.pdfLink || "";

    viewReportBtn.style.display = reportLinkInput.value ? "inline-block" : "none";
    viewReportBtn.href = reportLinkInput.value;
    modal.style.display = "flex";
  }

  closeModalBtn.addEventListener("click", () => modal.style.display = "none");

  saveReportBtn.addEventListener("click", () => {
    if (currentDay) {
      localStorage.setItem(`report_day_${currentDay}`, reportTextarea.value.trim());
      localStorage.setItem(`report_link_day_${currentDay}`, reportLinkInput.value.trim());
      viewReportBtn.style.display = reportLinkInput.value.trim() ? "inline-block" : "none";
      viewReportBtn.href = reportLinkInput.value.trim();
      document.querySelector(`.day-card[data-day='${currentDay}'] p`).textContent =
        reportTextarea.value.trim() ? "✅ Completed" : "🕒 Not Completed";
      updateProgress();
      modal.style.display = "none";
    }
  });

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

  // === Certificate Modal ===
  certificateBtn.addEventListener("click", () => {
    certificateLink.value = localStorage.getItem("certificate_link") || "";
    viewCertificateBtn.style.display = certificateLink.value ? "inline-block" : "none";
    viewCertificateBtn.href = certificateLink.value;
    certificateModal.style.display = "flex";
  });

  saveCertificateBtn.addEventListener("click", () => {
    localStorage.setItem("certificate_link", certificateLink.value.trim());
    viewCertificateBtn.style.display = certificateLink.value.trim() ? "inline-block" : "none";
    viewCertificateBtn.href = certificateLink.value.trim();
    certificateModal.style.display = "none";
    alert("✅ Certificate link saved!");
  });

  closeCertificate.addEventListener("click", () => certificateModal.style.display = "none");

  // === Final Report Modal ===
  finalReportBtn.addEventListener("click", () => {
    finalReportLink.value = localStorage.getItem("final_report_link") || "";
    viewFinalReportBtn.style.display = finalReportLink.value ? "inline-block" : "none";
    viewFinalReportBtn.href = finalReportLink.value;
    finalReportModal.style.display = "flex";
  });

  saveFinalReportBtn.addEventListener("click", () => {
    localStorage.setItem("final_report_link", finalReportLink.value.trim());
    viewFinalReportBtn.style.display = finalReportLink.value.trim() ? "inline-block" : "none";
    viewFinalReportBtn.href = finalReportLink.value.trim();
    finalReportModal.style.display = "none";
    alert("✅ Final Report link saved!");
  });

  closeFinalReport.addEventListener("click", () => finalReportModal.style.display = "none");

  // Progress Update
  function updateProgress() {
    let completed = 0;
    for (let i = 1; i <= 21; i++) {
      if (localStorage.getItem(`report_day_${i}`) || reports[i]) completed++;
    }
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
