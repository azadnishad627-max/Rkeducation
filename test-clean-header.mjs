function generateCleanPrintHtml(questions) {
  const totalQ = questions.length;
  const maxMarks = totalQ; // jitna question utna number
  const totalMinutes = totalQ; // jitna question utna time
  const timeFormatted = totalMinutes >= 60 
    ? `${totalMinutes} Min (${Math.floor(totalMinutes / 60)} Hr ${totalMinutes % 60 ? (totalMinutes % 60) + ' Min' : ''})`
    : `${totalMinutes} Minutes`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RK EDUCATION - Test Paper</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 8mm 10mm 8mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      height: auto !important;
      min-height: 100% !important;
      overflow: visible !important;
      background: #fff !important;
      color: #000 !important;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
      padding: 0;
    }

    /* TOP HEADER: ONLY RK EDUCATION */
    .header-box {
      border: 2px solid #000;
      border-radius: 6px;
      padding: 8px 12px;
      text-align: center;
      margin-bottom: 6px;
      background: #fafafa;
    }
    .coaching-title {
      font-size: 20pt;
      font-weight: 900;
      color: #b91c1c;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-family: Arial, 'Segoe UI', sans-serif;
    }
    .meta-bar {
      margin-top: 5px;
      padding-top: 4px;
      border-top: 1.5px solid #000;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 9pt;
      color: #000;
    }

    /* STUDENT INFO ROW */
    .student-row {
      width: 100%;
      border: 1px solid #000;
      border-radius: 4px;
      padding: 4px 8px;
      margin-bottom: 6px;
      font-size: 8.5pt;
      display: flex;
      justify-content: space-between;
    }

    /* 2-COLUMN SIDE-BY-SIDE NEWSPAPER / BOARD EXAM LAYOUT ACROSS ALL PAGES */
    .columns-container {
      column-count: 2 !important;
      column-gap: 22px !important;
      column-rule: 1.5px solid #000 !important;
      height: auto !important;
      overflow: visible !important;
      text-align: justify;
    }

    .question-card {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      margin-bottom: 8px !important;
      padding-bottom: 2px;
      display: block !important;
    }
    .q-text {
      font-weight: bold;
      font-size: 9.5pt;
      color: #000;
      margin-bottom: 2px;
    }
    .q-marks {
      float: right;
      font-size: 8pt;
      font-weight: bold;
      color: #475569;
    }
    .options-grid {
      margin-left: 10px;
      font-size: 8.5pt;
    }
    .opt-item {
      margin-bottom: 1.5px;
    }

    /* ANSWER KEY SECTION AT END */
    .ans-key-box {
      margin-top: 16px;
      border-top: 2px dashed #000;
      padding-top: 8px;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    .ans-key-title {
      font-size: 11pt;
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 6px;
      text-align: center;
    }
    .ans-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 3px;
      font-size: 8pt;
      text-align: center;
    }
    .ans-cell {
      border: 1px solid #94a3b8;
      padding: 2.5px;
      background: #f8fafc;
      border-radius: 2px;
    }

    @media print {
      html, body {
        width: 100%;
        height: auto !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER WITH ONLY RK EDUCATION IN ENGLISH -->
  <div class="header-box">
    <div class="coaching-title">RK EDUCATION</div>
    <div class="meta-bar">
      <span>📝 <strong>Total Questions:</strong> ${totalQ}</span>
      <span>⏱️ <strong>Time Allowed:</strong> ${timeFormatted}</span>
      <span>🏆 <strong>Max Marks:</strong> ${maxMarks}</span>
    </div>
  </div>

  <!-- STUDENT DETAILS ROW -->
  <div class="student-row">
    <span><strong>Student Name:</strong> ___________________________</span>
    <span><strong>Roll No:</strong> ____________</span>
    <span><strong>Date:</strong> ____________</span>
  </div>

  <!-- 2-COLUMN SIDE-BY-SIDE QUESTIONS (CONTINUOUS MULTI-PAGE FLOW) -->
  <div class="columns-container">
    ${questions.map((q, idx) => `
      <div class="question-card">
        <div class="q-text">
          <span class="q-marks">[1 Mark]</span>
          <span>Q. ${idx + 1}. ${q.q}</span>
        </div>
        <div class="options-grid">
          ${q.options.map(opt => `<div class="opt-item">${opt}</div>`).join('')}
        </div>
      </div>
    `).join('')}
  </div>

  <!-- ANSWER KEY TABLE -->
  <div class="ans-key-box">
    <div class="ans-key-title">❖ ANSWER KEY (Total ${totalQ} Questions) ❖</div>
    <div class="ans-grid">
      ${questions.map((q, idx) => `
        <div class="ans-cell">
          <strong>Q${idx + 1}:</strong> ${q.ans.split(' ')[0]}
        </div>
      `).join('')}
    </div>
  </div>

</body>
</html>
  `;
}

console.log("HTML generated successfully for 152 questions!");
