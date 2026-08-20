const answersPart = `
1. A
2. B
3. B
4. C
5. D
6. C
7. B
8. B
9. A
10. B
11. C
12. A
13. A
14. C
15. D
16. C
17. C
18. A
19. A
20. B
21. D
22. C
23. B
24. B
25. A
26. C
27. D
28. C
29. A
30. B
`;

const answerMap = {};
const regex = /(?:^|\s)(\d{1,3})[\.\)\-\:\s]+[\(\[]?([A-Da-dक-घ१-४])/g;
for (const match of answersPart.matchAll(regex)) {
  answerMap[parseInt(match[1], 10)] = match[2].toUpperCase();
}

console.log("Answer Map:", answerMap);
console.log("Q30 ans:", answerMap[30]);
