function generate200QuestionsHtml(count = 200) {
  const questions = [];
  for (let i = 1; i <= count; i++) {
    questions.push({
      id: i,
      q: `यह प्रश्न संख्या ${i} का पाठ है। निम्नलिखित में से सही विकल्प चुनें?`,
      options: [`(A) विकल्प A (${i})`, `(B) विकल्प B (${i})`, `(C) विकल्प C (${i})`, `(D) विकल्प D (${i})`],
      ans: `(A) विकल्प A (${i})`,
      marks: 1
    });
  }

  const html = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>RK EDUCATION - 200 Questions Test Paper</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 8mm 12mm 8mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      height: auto !important;
      overflow: visible !important;
      background: #fff;
      color: #000;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
    }
    .header-box {
      border: 2px solid #000;
      border-radius: 4px;
      padding: 6px 10px;
      text-align: center;
      margin-bottom: 6px;
      background: #fdfdfd;
    }
    .coaching-title {
      font-size: 16pt;
      font-weight: 900;
      color: #b91c1c;
      text-transform: uppercase;
    }
    .columns-container {
      column-count: 2;
      column-gap: 20px;
      column-rule: 1.5px solid #000;
      height: auto !important;
    }
    .question-card {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      margin-bottom: 8px;
    }
    .q-text {
      font-weight: bold;
      font-size: 9pt;
      color: #000;
      margin-bottom: 2px;
    }
    .options-grid {
      margin-left: 8px;
      font-size: 8.5pt;
    }
  </style>
</head>
<body>
  <div class="header-box">
    <div class="coaching-title">आर. के. एजुकेशन एवं कोचिंग संस्थान</div>
    <div>200 प्रश्नों का संपूर्ण मेगा टेस्ट पेपर</div>
  </div>
  <div class="columns-container">
    ${questions.map((q, idx) => `
      <div class="question-card">
        <div class="q-text">प्र. ${idx + 1}. ${q.q}</div>
        <div class="options-grid">
          ${q.options.map(opt => `<div>${opt}</div>`).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>
  `;

  return html;
}

const html = generate200QuestionsHtml(200);
console.log("Generated HTML length for 200 questions:", html.length, "bytes");
console.log("Contains 200 questions: ", html.includes("प्र. 200."));
