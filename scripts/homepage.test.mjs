import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {pageSeo, HOMEPAGE_OPERATIONAL_GRIP_EXPLANATION} from '../src/seo/registry.mjs';

// Run pnpm build:test before these generated-output regressions. Browser checks
// remain necessary for layout, real font loading, contrast, focus, and motion.
const html = route => readFileSync(new URL(`../dist/${route}index.html`, import.meta.url), 'utf8');
const home = html('');
const main = home.match(/<main\b[\s\S]*?<\/main>/)[0];
const links = markup => [...markup.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(([,href,body])=>({href,body}));
const nav = markup => markup.match(/<nav\b[^>]*class="desktop-nav"[\s\S]*?<\/nav>/)[0];
const footer = markup => markup.match(/<footer\b[\s\S]*?<\/footer>/)[0];
const text = markup => markup.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();

test('homepage keeps the approved team-first copy and one H1', () => {
 assert.equal((main.match(/<h1\b/g)||[]).length,1);
 for(const copy of ['Organizations do not outgrow teams.','They lose the boundaries that focus human expertise and AI capability on outcomes the organization needs.','Teamwork with AI expands what is possible and how quickly it can be explored.','3Back helps leaders work through a bounded execution problem and build the capability to handle the next one.',HOMEPAGE_OPERATIONAL_GRIP_EXPLANATION]) assert.ok(text(main).includes(copy),copy);
 assert.ok(text(main).includes('As possibilities become less costly to produce, the constraint shifts toward selection.'));
});

test('five homepage sections retain the approved reading order', () => {
 const sections=[...main.matchAll(/<section\b[^>]*class="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(sections,['hero','grip','engage','credibility','current-ideas']);
});

test('homepage actions use destination-specific decorative arrows', () => {
 for(const {href,body} of links(main)) {
  const expected=href.startsWith('#')?'↓':['/grip-check/','/workshops/','/domain-guides/','/contact/'].includes(href)?'↗':'→';
  assert.match(body,new RegExp(`<span[^>]*aria-hidden="true"[^>]*>${expected}<\\/span>`),href);
 }
 const hero=main.match(/<section\b[^>]*class="hero"[\s\S]*?<\/section>/)[0];
 assert.deepEqual(links(hero).map(l=>l.href),['/grip-check/','#engage','#why-3back']);
 for(const id of ['engage','why-3back','grip']) assert.equal((main.match(new RegExp(`id="${id}"`,'g'))||[]).length,1);
});

test('engagement rows lead to three different services', () => {
 const engagement=main.match(/<section\b[^>]*id="engage"[\s\S]*?<\/section>/)[0];
 assert.deepEqual(links(engagement).map(l=>l.href),['/grip-check/','/workshops/','/domain-guides/']);
 assert.ok(text(engagement).includes('Your people learn inside the work'));
 for(const copy of ['Assess it','Check your operational grip','Workshop a bounded problem','Build your Domain Guides program']) assert.ok(text(engagement).includes(copy),copy);
});

test('approved service statement and assessment note replace the diagnostic question', () => {
 assert.ok(text(main).includes('About 7 minutes · Get your scores'));
 assert.match(main,/aria-describedby="grip-duration"/);
 assert.ok(!main.includes('pressure-question'));
 assert.ok(!main.includes('team-icons'));
});

test('four available ideas replace the closing conversation band', () => {
 const ideas=main.match(/<section\b[^>]*id="current-ideas"[\s\S]*?<\/section>/)[0];
 const destinations=links(ideas).map(l=>l.href);
 assert.equal(destinations.length,4);
 assert.ok(destinations[0].startsWith('/tales-of-the-grip/'));
 assert.deepEqual(destinations.slice(1),['/papers/no-head-works-alone/','/papers/how-3back-approaches-learning/','/ideas/#books-title']);
 assert.match(ideas,/<img\b[^>]*alt="Preview of /);
 assert.ok(!main.includes('id="conversation"'));
 assert.equal((ideas.match(/<img\b/g)||[]).length,4);
 assert.ok(text(ideas).includes('Operational Grip · Coming soon.'));
 assert.ok(text(ideas).includes('Understanding overloaded decision-making.'));
 assert.ok(text(ideas).includes('How understanding develops into capability through judgment, action, and evidence.'));
 assert.ok(html('ideas/').includes('id="books-title"'));
});

test('signals and domain-guided diagram labels remain live text', () => {
 for(const label of ['Legible demand','Guided selection','Bounded failure','Visible results','Four signals of Operational Grip']) assert.ok(text(main).includes(label));
 assert.match(main,/class="box-label"[^>]*>Teamwork with AI<\/span>/);
 assert.match(main,/class="box-label"[^>]*>Domain-guided<br\b[^>]*>selection<\/span>/);
 for(const label of ['Possibilities','Outcomes']) assert.match(main,new RegExp(`class="outer-label[^>]*>${label}<\\/span>`));
});

test('homepage header changes do not leak into inner-page navigation', () => {
 assert.deepEqual(links(nav(home)).map(l=>l.href),['/operational-grip/','#engage']);
 for(const route of ['about-us/','domain-guides/','training/product-ownership-3/']) {
  assert.deepEqual(links(nav(html(route))).map(l=>l.href),['/operational-grip/','/ideas/','/about-us']);
 }
});

test('shared footer preserves approved groups and the PO3 exception', () => {
 for(const route of ['','about-us/','domain-guides/','training/product-ownership-3/']) {
  const markup=footer(html(route));
  const headings=[...markup.matchAll(/class="footer-heading"[^>]*>([^<]+)<\/p>/g)].map(m=>m[1]);
  assert.deepEqual(headings,['Explore','Engage','Learn','Company']);
  const hrefs=links(markup).map(l=>l.href);
  for(const href of ['/grip-check/','/workshops/','/domain-guides/','/privacy-policy/','/course-policy/','https://www.linkedin.com/company/3back-llc/','https://www.facebook.com/3back','https://x.com/scrum_coach']) assert.ok(hrefs.includes(href),href);
  assert.equal(hrefs.includes('https://path.3back.com'),route!=='training/product-ownership-3/');
 }
});

test('homepage retains its registry title, canonical, and no local destinations', () => {
 assert.ok(home.includes(`<title>${pageSeo['/'].title}</title>`));
 assert.match(home,/<link[^>]*rel="canonical"[^>]*href="https:\/\/3back.com\/"/);
 assert.ok(links(main).every(l=>!l.href.includes('localhost')&&!l.href.includes('127.0.0.1')));
});
