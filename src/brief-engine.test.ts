import { analyzeBrief } from './brief-engine';

const dental = 'We are a small dental clinic operating in two locations. We need a web-based appointment booking system. Patients should be able to select a location, choose a dental service, see available time slots, and book an appointment. They should receive confirmation emails and be able to cancel bookings up to 24 hours before their appointment. Clinic staff need an admin dashboard to manage appointments and dentist schedules. The website should support English and Vietnamese. Our budget, payment integration, and launch deadline have not been finalized.';

export function testRules(): void {
  const res = analyzeBrief(dental);
  if (res.categories.functional.length !== 4 || res.categories.context.length !== 1 || res.categories.nonfunctional.length !== 1 || res.categories.openDecisions.length !== 1) {
    throw Error('Dental categories incorrect ' + JSON.stringify(res.categories));
  }
  const out = analyzeBrief('We need a booking website. No mobile app for v1. The budget is capped at $4000. Deadline is November 12.').categories;
  if (out.outOfScope.length !== 1 || out.constraints.length !== 2 || out.functional.length !== 1) {
    throw Error('Constraints and exclusion categories incorrect ' + JSON.stringify(out));
  }
  const longBrief = Array.from({length:85},(_,i)=>`Feature ${i} should allow booking.`).join('\n');
  const limited = analyzeBrief(longBrief);
  if (!limited.truncated || limited.analyzedStatements !== 80 || limited.totalStatements !== 85) throw Error('80 sentence cap not disclosed correctly');
}
