import fs from 'fs';

function generate152Text() {
  let out = "# 152 प्रश्न टेस्ट सीरीज\n\n";
  for (let i = 1; i <= 152; i++) {
    out += `प्र. ${i}. यह प्रश्न संख्या ${i} का पाठ है। निम्न में से सही उत्तर क्या है?\n`;
    out += `(1) चार्टर एक्ट 1813 (${i})\n`;
    out += `(2) चार्टर एक्ट 1833 (${i})\n`;
    out += `(3) चार्टर एक्ट 1853 (${i})\n`;
    out += `(4) रौलट एक्ट (${i})\n\n`;
  }
  return out;
}

const sample152 = generate152Text();

function universalExamParser(rawText) {
  if (!rawText || !rawText.trim()) return [];

  const parts = rawText.split(/(?:उत्तरमाला|उत्तर कुंजी|Answer\s*Key|Answers)/i);
  const questionsPart = parts[0];
  const answersPart = parts.length > 1 ? parts[1] : '';

  const answerMap = {};
  if (answersPart) {
    const ansMatches = answersPart.matchAll(/(?:^|\n|\s)(\d{1,4})[\.\)\-\:\s]+[\(\[]?([A-Da-d1-4क-घ१-४])/g);
    for (const match of ansMatches) {
      const qNum = parseInt(match[1], 10);
      let val = match[2].toUpperCase();
      if (val === '1' || val === 'क' || val === '१') val = 'A';
      if (val === '2' || val === 'ख' || val === '२') val = 'B';
      if (val === '3' || val === 'ग' || val === '३') val = 'C';
      if (val === '4' || val === 'घ' || val === '४') val = 'D';
      answerMap[qNum] = val;
    }
  }

  const lines = questionsPart.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const parsedQuestions = [];
  let currentQ = null;

  const qStartRegex = /^(?:प्र(?:श्न)?[\.\s]*\d+|Q[\.\s]*\d+|\d+)[\.\)\-\:\s]+(.+)/i;
  const qNumExtractRegex = /^(?:प्र(?:श्न)?[\.\s]*|Q[\.\s]*|)(\d+)/i;
  const optRegex = /^[\(\[]?([A-Da-d1-4क-घ१-४ivxIVX]+)[\)\]\.\-:]\s*(.+)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const inlineAnsMatch = line.match(/^(?:उत्तर|Ans|Answer|सही उत्तर)[\s\-\:]+[\(\[]?([A-Da-d1-4क-घ१-४])/i);
    if (inlineAnsMatch && currentQ) {
      let val = inlineAnsMatch[1].toUpperCase();
      if (val === '1' || val === 'क' || val === '१') val = 'A';
      if (val === '2' || val === 'ख' || val === '२') val = 'B';
      if (val === '3' || val === 'ग' || val === '३') val = 'C';
      if (val === '4' || val === 'घ' || val === '४') val = 'D';
      currentQ.ansLetter = val;
      continue;
    }

    const isQLine = qStartRegex.test(line) && !line.match(/^[\(\[]?[1-4A-Da-dक-घ][\)\]\.\-:]\s*[\u0900-\u097F\w]/);
    const isExplicitQ = /^(?:प्र(?:श्न)?[\.\s]*\d+|Q[\.\s]*\d+)/i.test(line);

    if (isExplicitQ || (isQLine && (!currentQ || currentQ.options.length >= 2))) {
      if (currentQ) {
        parsedQuestions.push(currentQ);
      }
      const rawNumMatch = line.match(qNumExtractRegex);
      const rawNum = rawNumMatch ? parseInt(rawNumMatch[1], 10) : parsedQuestions.length + 1;
      const cleanQText = line.replace(/^(?:प्र(?:श्न)?[\.\s]*\d+|Q[\.\s]*\d+|\d+)[\.\)\-\:\s]+/, '').trim();

      currentQ = {
        rawNum: rawNum,
        id: parsedQuestions.length + 1,
        q: cleanQText,
        options: [],
        ans: '',
        ansLetter: answerMap[rawNum] || '',
        marks: 1
      };
      continue;
    }

    if (currentQ && (line.includes('(1)') || line.includes('(A)')) && (line.includes('(2)') || line.includes('(B)'))) {
      const splitted = line.split(/(?=\([\dA-Za-zक-घ]\))/g);
      splitted.forEach(s => {
        if (s.trim()) {
          const optM = s.trim().match(optRegex);
          if (optM) {
            let label = optM[1].toUpperCase();
            if (label === '1' || label === 'क') label = 'A';
            if (label === '2' || label === 'ख') label = 'B';
            if (label === '3' || label === 'ग') label = 'C';
            if (label === '4' || label === 'घ') label = 'D';
            currentQ.options.push(`(${label}) ${optM[2].trim()}`);
          }
        }
      });
      continue;
    }

    const optMatch = line.match(optRegex);
    if (optMatch && currentQ) {
      let label = optMatch[1].toUpperCase();
      if (label === '1' || label === 'क' || label === '१') label = 'A';
      if (label === '2' || label === 'ख' || label === '२') label = 'B';
      if (label === '3' || label === 'ग' || label === '३') label = 'C';
      if (label === '4' || label === 'घ' || label === '४') label = 'D';

      currentQ.options.push(`(${label}) ${optMatch[2].trim()}`);
      continue;
    }

    if (currentQ && currentQ.options.length === 0) {
      currentQ.q += ' ' + line;
    }
  }

  if (currentQ) {
    parsedQuestions.push(currentQ);
  }

  parsedQuestions.forEach((q, idx) => {
    q.id = idx + 1;
    if (q.options.length === 0) {
      q.options = ['(A) विकल्प 1', '(B) विकल्प 2', '(C) विकल्प 3', '(D) विकल्प 4'];
    }
    const effectiveAnsLetter = q.ansLetter || answerMap[q.rawNum] || answerMap[q.id];
    if (effectiveAnsLetter) {
      const matchOpt = q.options.find(o => o.startsWith(`(${effectiveAnsLetter})`));
      q.ans = matchOpt || `(${effectiveAnsLetter})`;
    } else {
      q.ans = q.options[0] || '(A)';
    }
  });

  return parsedQuestions;
}

const parsed152 = universalExamParser(sample152);
console.log("Parsed 152 questions count:", parsed152.length);
console.log("First Question:", parsed152[0]);
console.log("Last Question (152):", parsed152[151]);
