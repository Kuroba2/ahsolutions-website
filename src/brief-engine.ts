/** Deterministic, browser-local baseline. Not an AI model. */
export type BriefCategory =
  | 'functional'
  | 'nonfunctional'
  | 'context'
  | 'constraints'
  | 'outOfScope'
  | 'openDecisions';

export type BriefAnalysis = {
  categories: Record<BriefCategory, string[]>;
  questions: string[];
  totalStatements: number;
  analyzedStatements: number;
  truncated: boolean;
};

const LIMIT = 80;

export function splitBrief(raw: string): string[] {
  const entries = raw.replace(/\r/g, '\n')
    .split(/\n+|(?<=[.!?])\s+(?=[A-ZÀ-Ỹ0-9])/u)
    .map((line) => line.trim().replace(/^[\s\-•*\d.)]+/u, '').trim())
    .filter((line) => line.length >= 8 && !/^fictional sample\b/i.test(line));
  const unique = new Set<string>();
  return entries.filter((line) => {
    const normalized = line.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
    if (unique.has(normalized)) return false;
    unique.add(normalized);
    return true;
  });
}

export function classifyStatement(statement: string): BriefCategory {
  const s = statement.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();

  // Order matters: explicit exclusions/unknowns must not be labeled features.
  // English and Vietnamese examples are supported; these are keyword rules,
  // not semantic understanding. One statement currently gets one category.
  if (
    /\b(out of scope|excluded?|not in scope|won't include|will not include|don't need|do not need|do not (?:build|develop|create|implement|support|include)|don't (?:build|develop|create|implement|support|include)|no (?:mobile |native )?app|not required|without a mobile app)\b/iu.test(s) ||
    /không\s+(?:cần|bao gồm|làm|xây(?:\s+dựng)?|phát\s+triển|triển\s+khai|hỗ\s+trợ|tích\s+hợp)/iu.test(s) ||
    /ngoài\s+phạm\s+vi|không\s+thuộc\s+phạm\s+vi/iu.test(s)
  ) return 'outOfScope';

  if (
    /\b(not (?:yet )?(?:been )?(?:finalized|decided|defined|selected|confirmed)|undecided|tbd|to be (?:decided|confirmed|determined)|under consideration|not sure|still unknown|considering|has not been|have not been)\b/iu.test(s) ||
    /chưa\s+(?:quyết\s+định|xác\s+định|chốt|rõ|thống\s+nhất)|đang\s+cân\s+nhắc/iu.test(s)
  ) return 'openDecisions';

  if (
    /\b(english|vietnamese|multilingual|multi-language|localization|accessib(?:le|ility)|wcag|responsive|performance|latency|uptime|availability requirement|encryption|security standard|gdpr|languages?)\b/iu.test(s) ||
    /đa\s+ngôn\s+ngữ|bảo\s+mật|hiệu\s+năng|tiếng\s+(?:anh|việt)|khả\s+năng\s+truy\s+cập/iu.test(s)
  ) return 'nonfunctional';

  if (
    /\b(budget|budget cap|cost ceiling|deadline|must launch by|launch by|delivery date|within\s+\d+\s*(?:days?|weeks?|months?)|(?:launch|go live|release|ship|deliver|finish|complete)\s+(?:in|within|after|by)\s+\d+\s*(?:days?|weeks?|months?)|no more than\s+\d+|limited to\s+\d+)\b/iu.test(s) ||
    /ngân\s+sách|hạn\s+chót|hạn\s+giao|ra\s+mắt\s+(?:sau|trong|vào|trước)\s+\d+\s*(?:ngày|tuần|tháng)|(?:triển\s+khai|hoàn\s+thành|bàn\s+giao)\s+(?:sau|trong|vào|trước)\s+\d+\s*(?:ngày|tuần|tháng)/iu.test(s)
  ) return 'constraints';

  if (
    /\b(need|needs|want|wants|must|should|shall|can|able to|allow|allows|support|supports|manage|show|send|receive|book|select|choose|cancel|create|update|delete|track|export|generate|approve|schedule|upload|download|notify|integrate|dashboard|login|sign in|register|search|filter)\b/iu.test(s) ||
    /cho\s+phép|cần\s+có|có\s+thể|đặt\s+lịch|quản\s+lý|thông\s+báo|đăng\s+nhập|chọn\s+(?:dịch\s+vụ|lịch|ngày|giờ|địa\s+điểm)|nhận\s+(?:email|thư|thông\s+báo|xác\s+nhận)|gửi\s+(?:email|thư|thông\s+báo|xác\s+nhận)|xem\s+(?:lịch|danh\s+sách|thông\s+tin)|tìm\s+kiếm|tải\s+lên|tải\s+xuống|xuất\s+(?:file|báo\s+cáo)|thanh\s+toán|đăng\s+ký|hủy|huỷ|tạo\s+(?:tài\s+khoản|báo\s+cáo|đơn)|cập\s+nhật|xóa|xoá|đồng\s+bộ/iu.test(s)
  ) return 'functional';

  return 'context';
}

function makeQuestions(raw: string, openDecisions: string[]): string[] {
  const base = [
    'Which features are essential for the first release, and which can wait?',
    'Who will approve the requirements and final scope?',
    'How will the team measure whether the first release is useful?',
  ];
  const candidates: Array<[RegExp, string]> = [
    [/book|appoint|reserv|schedul|đặt lịch/iu, 'What booking rules apply to availability, cancellations, time zones, and conflicts?'],
    [/pay|checkout|billing|invoice|thanh toán/iu, 'Are online payments in scope, and which providers and billing rules are required?'],
    [/login|account|role|permission|đăng nhập/iu, 'Which user roles exist, and what can each role access?'],
    [/email|sms|notifi|thông báo/iu, 'Which notifications are required, and when should they be sent?'],
    [/integrat|api|calendar|sync|tích hợp/iu, 'Which integrations are confirmed versus still being considered?'],
    [/data|customer|privacy|personal|dữ liệu|patient/iu, 'What sensitive data will be handled, and what retention and access rules apply?'],
  ];
  for (const [pattern, question] of candidates) if (pattern.test(raw)) base.push(question);
  if (/budget|cost|pricing|ngân sách/iu.test(raw)) base.push('What is the approved budget or budget range?');
  if (/deadline|timeline|launch|pilot|hạn|ra\s+mắt|triển\s+khai/iu.test(raw)) base.push('Which delivery milestones and launch dates are confirmed?');
  else base.push('Is there a fixed target launch date?');
  if (openDecisions.length) base.push('Which undecided items must be resolved before a proposal can be approved?');
  return [...new Set(base)];
}

export function analyzeBrief(raw: string): BriefAnalysis {
  const statements = splitBrief(raw);
  const categories: BriefAnalysis['categories'] = {
    functional: [], nonfunctional: [], context: [], constraints: [], outOfScope: [], openDecisions: [],
  };
  for (const statement of statements.slice(0, LIMIT)) {
    categories[classifyStatement(statement)].push(statement);
  }
  return {
    categories,
    questions: makeQuestions(raw, categories.openDecisions),
    totalStatements: statements.length,
    analyzedStatements: Math.min(statements.length, LIMIT),
    truncated: statements.length > LIMIT,
  };
}

export function proposalFromAnalysis(raw: string, report: BriefAnalysis): string {
  const bullets = (items: string[], fallback: string) => items.length ? items.map((v) => `- ${v.replace(/\n/g, ' ')}`).join('\n') : `- ${fallback}`;
  const text = raw.trim().replace(/\r/g, '');
  return `# Project proposal — editable working outline\n\n> AH BriefFlow interactive demo. Deterministic browser-side rules, NOT Claude or another AI. Categories are suggestions, not confirmed requirements. Human review required.\n\n## Brief excerpt\n\n${text.slice(0, 1200)}${text.length > 1200 ? '\n\n[Excerpt truncated; refer to original brief.]' : ''}\n\n## Candidate functional requirements\n\n${bullets(report.categories.functional, 'Not identified by the current rules; review original brief.')}\n\n## Non-functional requirements\n\n${bullets(report.categories.nonfunctional, 'Not identified; confirm quality, language, accessibility, security needs.')}\n\n## Project context\n\n${bullets(report.categories.context, 'No background statements detected.')}\n\n## Constraints and confirmed limits\n\n${bullets(report.categories.constraints, 'Not identified; confirm budget and delivery limits.')}\n\n## Explicitly out of scope\n\n${bullets(report.categories.outOfScope, 'No exclusions identified; confirm exclusions with the client.')}\n\n## Open decisions\n\n${bullets(report.categories.openDecisions, 'No undecided items recognized; confirm unknowns with the client.')}\n\n## Clarification questions\n\n${bullets(report.questions, 'No suggestions generated.')}\n\n## Draft scope and deliverables\n\n- Potential in-scope work: review candidate functional requirements above.\n- Exclusions: review explicit out-of-scope items above.\n- Integrations: confirm all providers and credentials separately.\n- Deliverables and estimates: TBD after clarification.\n- Timeline: ${report.categories.constraints.some(x => /deadline|launch by|delivery date|hạn chót/iu.test(x)) ? 'See identified constraints above; obtain human approval before commitment.' : 'TBD; no confirmed schedule inferred.'}\n\n## Human approval\n\n- [ ] Validate every extracted item against the source brief.\n- [ ] Confirm scope, integrations, security, and exclusions.\n- [ ] Agree on deliverables, budget, and timeline independently.\n`;
}
