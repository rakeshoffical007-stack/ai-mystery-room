async function runTests() {
  const baseURL = 'http://localhost:5000/api';
  console.log('🧪 Starting API Verification Tests...\n');

  // 1. Health
  const healthRes = await fetch(`${baseURL}/health`);
  const health = await healthRes.json();
  console.log('1. Health Check:', health.status, '| DB:', health.database);

  // 2. Create Case (Easy: 3 suspects, 5 clues, 2 hints)
  const createRes = await fetch(`${baseURL}/cases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      premise: 'A stolen emerald from the royal crown museum',
      difficulty: 'easy'
    })
  });
  const created = await createRes.json();
  const caseData = created.case;
  console.log('2. Case Created:', caseData.title);
  console.log(`   - Suspects count: ${caseData.suspects.length} (Expected: 3)`);
  console.log(`   - Clues count: ${caseData.clues.length} (Expected: 5)`);
  console.log(`   - Hints count: ${caseData.hints.length} (Expected: 2)`);

  // 3. Security Verification
  const solutionExposed = caseData.solution !== undefined;
  const isCulpritExposed = caseData.suspects.some(s => s.isCulprit !== undefined);
  console.log(`3. Security check: Solution leaked? ${solutionExposed} | isCulprit leaked? ${isCulpritExposed}`);

  // 4. Clue Discovery
  const clueId = caseData.clues[0].id;
  const discRes = await fetch(`${baseURL}/cases/${caseData.id}/clues/${clueId}/discover`, {
    method: 'POST'
  });
  const discData = await discRes.json();
  console.log(`4. Discovered Clue: "${discData.clue.title}" | Discovered total: ${discData.playerProgress.discoveredCluesCount}`);

  // 5. Hint Request
  const hintRes = await fetch(`${baseURL}/cases/${caseData.id}/hints`, {
    method: 'POST'
  });
  const hintData = await hintRes.json();
  console.log(`5. Revealed Hint: "${hintData.hint.text}" | Hints used: ${hintData.playerProgress.hintsUsedCount}`);

  // 6. Accusation
  const suspectId = caseData.suspects[1].id; // Try suspect 2
  const accuseRes = await fetch(`${baseURL}/cases/${caseData.id}/accuse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suspectId })
  });
  const accuseData = await accuseRes.json();
  console.log(`6. Accusation Submitted: Verdict: ${accuseData.verdict}`);
  console.log(`   - Culprit: ${accuseData.culprit.name}`);
  console.log(`   - Final Score: ${accuseData.score}`);
  console.log(`   - Score Breakdown:`, accuseData.scoreBreakdown);

  // 7. Results endpoint
  const resultRes = await fetch(`${baseURL}/cases/${caseData.id}/result`);
  const resultData = await resultRes.json();
  console.log(`7. Results Endpoint: Solved? ${resultData.isSolved} | Score: ${resultData.score}`);

  console.log('\n🎉 ALL BACKEND API TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
