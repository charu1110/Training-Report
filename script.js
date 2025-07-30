
document.addEventListener("DOMContentLoaded", () => {

  // ✅ HARDCODE YOUR DATA HERE
  const reports = {
    1: {
      text: `Topic: Introduction to Python Programming

Python is a beginner-friendly, high-level language widely used in AI, data science, automation, and web development. On Day 1, I focused on basic syntax and logic building using simple programs.`,
      pdfLink: "https://1drv.ms/w/c/1569aa985bd1bf5d/EeHZsNFYYzpAm4-1XEEyEXkBOEX-IJbrk6ts0izMuY5yqQ?e=51PIwg"
    },
    
    2: {
      text: "TOPIC : Pyhton loops and basic programs .",
      pdfLink: "day2Training.pdf"
    },
    3: {
      text: "On Day 3 of our training, we delved into the basics of Artificial Intelligence (AI) and Machine Learning (ML), and worked hands-on with real-world datasets using the Pandas library in Google Colab. We also explored Kaggle.com, a collaborative platform for data science enthusiasts, and practiced on the World Happiness Report (2018–2019) dataset.",
      pdfLink: "day3.pdf"
    }
  ,
  4: {
      text: "Today’s session introduced us to the core principles of Machine Learning, along with hands-on experience of building a simple regression model using the California Housing Dataset. We explored how Pandas, NumPy, and Scikit-learn work together to help us prepare, train, and evaluate models efficiently.",
      pdfLink: "day4Training.pdf"
    },
    5: {
      text: "Today’s session was quite interesting as we stepped into the world of classification problems in machine learning. Unlike previous regression tasks where we were predicting continuous values, here the focus was on predicting categories or labels.",
      pdfLink: "day5Training.pdf"
    },
    6: {
      text: "Today, we continued exploring Logistic Regression, but this time instead of using preloaded datasets, we imported the Iris dataset from a CSV file using pandas. This gave a much more realistic feeling — just like working on a real-world project!",
      pdfLink: "day6Training.pdf"
    },
    7: {
      text: "On Day 7, we explored two widely used classification techniques in machine learning — K-Nearest Neighbors (KNN) and Support Vector Machine (SVM). We implemented, tuned, and evaluated both models using the well-known Iris flower dataset, leveraging powerful tools from the scikit-learn library. Visualization and error metrics were used for detailed comparison..",
      pdfLink: "day7Training.pdf"
    },
    8: {
      
      pdfLink: "day8Training.pdf"
    },
    9: {
      
      pdfLink: "day9Training.pdf"
    },
    10: {
      
      pdfLink: "day10Training.pdf"
    },
    11: {
     
      pdfLink: "day11Training.pdf"
    },
    12: {
      
      pdfLink: "day12Training.pdf"
    },
    13: {
      
      pdfLink: "day13Training.pdf"
    },
    14: {
      
      pdfLink: "day14Training.pdf"
    },
    15: {
      
      pdfLink: "day15Training.pdf"
    },
    16: {
      
      pdfLink: "day16Training.pdf"
    },
    17: {
      
      pdfLink: "day17Training.pdf"
    },
    18: {
      
      pdfLink: "day18Training.pdf"
    },
    19: {
      
      pdfLink: "day19Training.pdf"
    },
    20: {
      
      pdfLink: "day20Training.pdf"
    },
    21: {
      
      pdfLink: "day21Training.pdf"
    }
  };

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

  // Open modal
  function openModal(day) {
    currentDay = day;
    modalDayTitle.textContent = `Day ${day} Report`;

    const savedText = localStorage.getItem(`report_day_${day}`) || reports[day]?.text || "";
    reportTextarea.value = savedText;

    const savedLink = localStorage.getItem(`report_link_day_${day}`) || reports[day]?.pdfLink || "";
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

      if (pdfLink) {
        viewReportBtn.style.display = "inline-block";
        viewReportBtn.href = pdfLink;
      } else {
        viewReportBtn.style.display = "none";
      }

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

  function updateProgress() {
    let completed = 0;
    for (let i = 1; i <= 30; i++) {
      if (localStorage.getItem(`report_day_${i}`) || reports[i]) {
        completed++;
      }
    }
    const percent = (completed / 30) * 100;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${completed} / 30 Days Completed`;
  }

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

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Theme" : "🌙 Theme";
  });

});
