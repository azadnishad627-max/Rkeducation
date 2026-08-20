const sampleText = `
प्र. 123. किशोरावस्था है:
(1) बचपन से जवानी में परिवर्तन की अवस्था
(2) जनन परिपक्वता के साथ समाप्त होती है
(3) 13 से 19 वर्ष तक की आयु
(4) शरीर में तीव्र बदलाव का समय

प्र. 124. नर जनन हार्मोन कौन सा है?
(1) एस्ट्रोजन
(2) टेस्टोस्टेरोन
(3) इंसुलिन
(4) थायरॉक्सिन

प्र. 152. निम्न में से किस एक्ट द्वारा भारत में दासता प्रथा समाप्त हुई?
(1) चार्टर एक्ट 1813
(2) चार्टर एक्ट 1833
(3) चार्टर एक्ट 1853
(4) रौलट एक्ट

उत्तरमाला (Answer Key)
123. 1
124. 2
152. 2
`;

function universalExamParser(rawText) {
  if (!rawText || !rawText.trim()) return [];

  // Split into Questions Section and Answer Key Section if present
  const parts = rawText.split(/(?:उत्तरमाला|उत्तर कुंजी|Answer\s*Key|Answers)/i);
  const questionsPart = parts[0];
  const answersPart = parts.length > 1 ? parts[1] : '';

  // 1. Extract Answer Key map (supports 1. A, 1. (1), 123. 2, 152-B)
  const answerMap = {};
  if (answersPart) {
    const ansMatches = answersPart.matchAll(/(?:^|\n|\s)(\d{1,4})[\.\)\-\:\s]+[\(\[]?([A-Da-d1-4क-घ१-४])/g);
    for (const match of ansMatches) {
      const qNum = parseInt(match[1], 10);
      let val = match[2].toUpperCase();
      // Map 1/2/3/4 to A/B/C/D
      if (val === '1' || val === 'क' || val === '१') val = 'A';
      if (val === '2' || val === 'ख' || val === '२') val = 'B';
      if (val === '3' || val === 'ग' || val === '३') val = 'C';
      if (val === '4' || val === 'घ' || val === '४') val = 'D';
      answerMap[qNum] = val;
    }
  }

  // 2. Extract lines
  const lines = questionsPart.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const parsedQuestions = [];
  let currentQ = null;

  // Regex patterns
  // Matches: "प्र. 152.", "प्रश्न 123:", "123.", "123)", "Q.152", "Q152:"
  const qStartRegex = /^(?:प्र(?:श्न)?[\.\s]*\d+|Q[\.\s]*\d+|\d+)[\.\)\-\:\s]+(.+)/i;
  const qNumExtractRegex = /^(?:प्र(?:श्न)?[\.\s]*|Q[\.\s]*|)(\d+)/i;

  // Matches: "(1)", "(A)", "1)", "A)", "(क)", "[1]", "[A]", "1.", "A."
  const optRegex = /^[\(\[]?([A-Da-d1-4क-घ१-४ivxIVX]+)[\)\]\.\-:]\s*(.+)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line is inline answer e.g. "उत्तर: (2)", "Ans: B"
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

    // Check if line is a new Question
    // A line is a question if it starts with question number pattern AND is NOT an option (1) to (4)
    const isQLine = qStartRegex.test(line) && !line.match(/^[\(\[]?[1-4A-Da-dक-घ][\)\]\.\-:]\s*[\u0900-\u097F\w]/);
    
    // Explicit question prefix "प्र." or "प्रश्न" or "Q" ALWAYS means a question
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

    // Check if line contains inline multiple options e.g. (1) ... (2) ... (3) ... (4) ...
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

    // Check if line is a single Option
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

    // If continuation text of question
    if (currentQ && currentQ.options.length === 0) {
      currentQ.q += ' ' + line;
    }
  }

  if (currentQ) {
    parsedQuestions.push(currentQ);
  }

  // Ensure 4 options per question & map correct answers
  parsedQuestions.forEach((q, idx) => {
    q.id = idx + 1; // Sequential ID (1, 2, 3...)
    
    // If fewer than 4 options, pad with defaults
    if (q.options.length === 0) {
      q.options = ['(A) विकल्प 1', '(B) विकल्प 2', '(C) विकल्प 3', '(D) विकल्प 4'];
    }

    // Bind Answer
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

const result = universalExamParser(sampleText);
console.log("Total Questions Parsed:", result.length);
console.log(JSON.stringify(result, null, 2));
