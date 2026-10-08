import './demo.css';
import { analyzeBrief, proposalFromAnalysis } from './brief-engine';

function required<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing required UI element: ${selector}`);
  return el;
}

const briefInput = required<HTMLTextAreaElement>('#brief');
const count = required<HTMLElement>('#count');
const sampleButton = required<HTMLButtonElement>('#sample');
const analyzeButton = required<HTMLButtonElement>('#analyze');
const clearButton = required<HTMLButtonElement>('#clear');
const empty = required<HTMLElement>('#empty');
const results = required<HTMLElement>('#results');
const proposal = required<HTMLTextAreaElement>('#proposal');
const downloadButton = required<HTMLButtonElement>('#download');
const copyButton = required<HTMLButtonElement>('#copy');
const status = required<HTMLElement>('#message');
const coverage = required<HTMLElement>('#coverage');

const lists = {
  functional: required<HTMLOListElement>('#requirements'),
  nonfunctional: required<HTMLUListElement>('#nonfunctional'),
  context: required<HTMLUListElement>('#context'),
  constraints: required<HTMLUListElement>('#constraints'),
  outOfScope: required<HTMLUListElement>('#outofscope'),
  openDecisions: required<HTMLUListElement>('#openitems'),
};
const counts = {
  functional: required<HTMLElement>('#req-count'),
  nonfunctional: required<HTMLElement>('#nfr-count'),
  context: required<HTMLElement>('#context-count'),
  constraints: required<HTMLElement>('#constraint-count'),
  outOfScope: required<HTMLElement>('#out-count'),
  openDecisions: required<HTMLElement>('#open-count'),
};
const questionList = required<HTMLUListElement>('#questions');

const fictionalBrief = `FICTIONAL SAMPLE — not a real customer request.\nA local appointment booking business wants a web app where customers can schedule and cancel appointments.\nCustomers should receive an email confirmation after booking.\nStaff need a dashboard to see appointments and mark attendance.\nNo mobile app for the first release.\nBudget is capped at $8,000.\nThe client is considering calendar integration but has not selected a provider.\nThey hope to launch a pilot for one location before expanding.`;

function showList(target: HTMLElement, values: string[]) {
  target.replaceChildren();
  for (const value of values) {
    const item = document.createElement('li');
    item.textContent = value; // Do not interpret visitor content as HTML.
    target.appendChild(item);
  }
}

function updateCount() { count.textContent = `${briefInput.value.length.toLocaleString()} / 12,000 characters`; }
briefInput.addEventListener('input', updateCount);
sampleButton.addEventListener('click', () => { briefInput.value = fictionalBrief; updateCount(); briefInput.focus(); });
clearButton.addEventListener('click', () => {
  briefInput.value = '';
  proposal.value = '';
  empty.hidden = false;
  results.hidden = true;
  status.textContent = '';
  updateCount();
  briefInput.focus();
});

analyzeButton.addEventListener('click', () => {
  const raw = briefInput.value.trim();
  if (raw.length < 25) {
    briefInput.setCustomValidity('Please enter at least 25 characters of project details.');
    briefInput.reportValidity();
    briefInput.setCustomValidity('');
    return;
  }
  const report = analyzeBrief(raw);
  if (report.totalStatements === 0) {
    briefInput.setCustomValidity('Please include recognizable project statements.');
    briefInput.reportValidity();
    briefInput.setCustomValidity('');
    return;
  }
  for (const category of Object.keys(lists) as Array<keyof typeof lists>) {
    showList(lists[category], report.categories[category]);
    counts[category].textContent = `(${report.categories[category].length})`;
  }
  showList(questionList, report.questions);
  coverage.textContent = `${report.analyzedStatements} of ${report.totalStatements} unique statements classified using keyword rules.` +
    (report.truncated ? ' Maximum 80 statements per run; remaining statements were not analyzed. Short fragments under 8 characters may be ignored.' : ' Short fragments under 8 characters may be ignored.');
  proposal.value = proposalFromAnalysis(raw, report);
  status.textContent = 'Draft generated locally. Review every category before sharing.';
  empty.hidden = true;
  results.hidden = false;
});

copyButton.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(proposal.value); status.textContent = 'Draft copied to clipboard.'; }
  catch { status.textContent = 'Clipboard unavailable. Select and copy the text from the editor.'; }
});

downloadButton.addEventListener('click', () => {
  const file = new Blob([proposal.value], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ah-briefflow-proposal-v02.md';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Markdown draft downloaded.';
});
updateCount();
