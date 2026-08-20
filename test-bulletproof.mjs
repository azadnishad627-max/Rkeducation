import fs from 'fs';

function bulletproofQuestionParser(rawText) {
  if (!rawText || !rawText.trim()) return [];

  // Normalize line endings and clean zero-width characters
  const cleanInput = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim();

  // 1. Separate Questions part and Answer Key part (if answer key is at bottom)
  const keySplit = cleanInput.split(/\n\s*(?:उत्तरमाला|उत्तर\s*कुंजी|Answer\s*Key|Answers\s*:?|KEY\s*:?)\s*[\:\-\(]?/i);
  const questionsPart = keySplit[0];
  const answersPart = keySplit.length > 1 ? keySplit.slice(1).join('\n') : '';

  // 2. Extract Answer Key map
  const answerMap = {};
  if (answersPart) {
    const keyMatches = answersPart.matchAll(/(?:^|\n|\s)(?:Q\s*)?(\d{1,4})[\.\)\-\:\s]+[\(\[]?([A-Da-d1-4क-घ१-४])/g);
    for (const km of keyMatches) {
      const qNum = parseInt(km[1], 10);
      let v = km[2].toUpperCase();
      if (v === '1' || v === 'क' || v === '१') v = 'A';
      if (v === '2' || v === 'ख' || v === '२') v = 'B';
      if (v === '3' || v === 'ग' || v === '३') v = 'C';
      if (v === '4' || v === 'घ' || v === '४') v = 'D';
      answerMap[qNum] = v;
    }
  }

  // 3. Question Splitting Regex:
  // Detects the start of every question regardless of format:
  // e.g., "1.", "प्र. 123.", "प्रश्न 152:", "Q. 1", "Que 1.", "123)"
  // Lookahead regex to split blocks
  const questionBoundaryRegex = /(?:^|\n)(?=(?:प्र(?:श्न)?[\.\s]*\d+|Q(?:ue)?[\.\s]*\d+|\d{1,4})[\.\)\-\:\s]+[^\n])/i;

  const rawBlocks = questionsPart.split(questionBoundaryRegex).map(b => b.trim()).filter(Boolean);

  const parsedQuestions = [];

  for (let block of rawBlocks) {
    // If the block is just a title (e.g. "# NMMS Test"), skip or extract title
    if (block.startsWith('#') && !block.match(/\n\s*[\(\[1-4A-Da-d]/)) {
      continue;
    }

    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    // Extract Question Number if present
    const firstLine = lines[0];
    const numMatch = firstLine.match(/^(?:प्र(?:श्न)?[\.\s]*|Q(?:ue)?[\.\s]*|)(\d{1,4})/i);
    const rawNum = numMatch ? parseInt(numMatch[1], 10) : parsedQuestions.length + 1;

    // Clean question header from first line
    const cleanFirstLine = firstLine.replace(/^(?:प्र(?:श्न)?[\.\s]*\d+|Q(?:ue)?[\.\s]*\d+|\d{1,4})[\.\)\-\:\s]+/, '').trim();

    let questionText = cleanFirstLine;
    let options = [];
    let inlineAnswer = '';

    // Check remaining lines for question continuation, options, and inline answer
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      // Check inline answer line: "उत्तर: (2)", "Ans: B"
      const ansMatch = line.match(/^(?:उत्तर|Ans|Answer|सही\s*उत्तर|Correct)[\s\-\:]+[\(\[]?([A-Da-d1-4क-घ१-४])/i);
      if (ansMatch) {
        let v = ansMatch[1].toUpperCase();
        if (v === '1' || v === 'क' || v === '१') v = 'A';
        if (v === '2' || v === 'ख' || v === '२') v = 'B';
        if (v === '3' || v === 'ग' || v === '३') v = 'C';
        if (v === '4' || v === 'घ' || v === '४') v = 'D';
        inlineAnswer = v;
        continue;
      }

      // Check if line contains inline multiple options: (1) ... (2) ... (3) ... (4) ...
      if ((line.includes('(1)') || line.includes('(A)')) && (line.includes('(2)') || line.includes('(B)'))) {
        const parts = line.split(/(?=\([1-4A-Da-dक-घ]\)|\[[1-4A-Da-dक-घ]\])/g);
        for (const p of parts) {
          const optMatch = p.trim().match(/^[\(\[]?([A-Da-d1-4क-घ१-४])[\)\]\.\-:]\s*(.+)/);
          if (optMatch) {
            let label = optMatch[1].toUpperCase();
            if (label === '1' || label === 'क' || label === '१') label = 'A';
            if (label === '2' || label === 'ख' || label === '२') label = 'B';
            if (label === '3' || label === 'ग' || label === '३') label = 'C';
            if (label === '4' || label === 'घ' || label === '४') label = 'D';
            options.push(`(${label}) ${optMatch[2].trim()}`);
          }
        }
        continue;
      }

      // Check single option line: "(1) विकल्प" or "A. Option" or "1) Option"
      const singleOptMatch = line.match(/^[\(\[]?([A-Da-d1-4क-घ१-४])[\)\]\.\-:]\s*(.+)/);
      if (singleOptMatch) {
        let label = singleOptMatch[1].toUpperCase();
        if (label === '1' || label === 'क' || label === '१') label = 'A';
        if (label === '2' || label === 'ख' || label === '२') label = 'B';
        if (label === '3' || label === 'ग' || label === '३') label = 'C';
        if (label === '4' || label === 'घ' || label === '४') label = 'D';
        options.push(`(${label}) ${singleOptMatch[2].trim()}`);
        continue;
      }

      // If no option has started yet, this line is question continuation text
      if (options.length === 0) {
        questionText += ' ' + line;
      }
    }

    // Ensure we always have 4 options
    if (options.length === 0) {
      options = ['(A) विकल्प 1', '(B) विकल्प 2', '(C) विकल्प 3', '(D) विकल्प 4'];
    } else if (options.length === 2) {
      options.push('(C) उपरोक्त दोनों', '(D) इनमें से कोई नहीं');
    } else if (options.length === 3) {
      options.push('(D) इनमें से कोई नहीं');
    }

    // Determine correct answer
    const ansKeyVal = inlineAnswer || answerMap[rawNum] || answerMap[parsedQuestions.length + 1];
    let matchedAns = options[0];
    if (ansKeyVal) {
      const found = options.find(o => o.startsWith(`(${ansKeyVal})`));
      if (found) matchedAns = found;
      else matchedAns = `(${ansKeyVal})`;
    }

    parsedQuestions.push({
      id: parsedQuestions.length + 1,
      rawNum: rawNum,
      q: questionText || `प्रश्न संख्या ${parsedQuestions.length + 1}`,
      options: options.slice(0, 4),
      ans: matchedAns,
      marks: 1
    });
  }

  return parsedQuestions;
}

// Test with 152 questions
let big152Text = "# 152 Questions Test Bank\n\n";
for (let i = 1; i <= 152; i++) {
  big152Text += `प्र. ${i}. यह प्रश्न संख्या ${i} का पाठ है। निम्न में से सही उत्तर कौन सा है?\n`;
  big152Text += `(1) चार्टर एक्ट 1813\n(2) चार्टर एक्ट 1833\n(3) चार्टर एक्ट 1853\n(4) रौलट एक्ट\n\n`;
}
big152Text += "उत्तरमाला (Answer Key)\n";
for (let i = 1; i <= 152; i++) {
  big152Text += `${i}. ${(i % 4) + 1}\n`;
}

const parsedResult = bulletproofQuestionParser(big152Text);
console.log("Bulletproof parser parsed count:", parsedResult.length);
console.log("Q1:", parsedResult[0]);
console.log("Q152:", parsedResult[151]);
