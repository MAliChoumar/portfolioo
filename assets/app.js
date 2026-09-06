/* ══════════════════════════════════════════════════════════════════
   WERK — behaviour
   Everything degrades: no JS still leaves a readable German page.
   ══════════════════════════════════════════════════════════════════ */
(function () {
"use strict";

var STILL = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var COARSE = window.matchMedia("(hover: none), (pointer: coarse)").matches;
var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var el = function (t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]; }); };

/* ══ DATA ═══════════════════════════════════════════════════════ */

var NODES = [
  { id:"os", label:"ChoumarOS", kind:"system", x:.30, y:.22, go:"#work",
    de:{m:"System · privat · 87 Commits", t:"Objekt-Engine mit Relationen, Versionen und Event-Timeline. Geschichtet in domain / application / infrastructure / features, mit E2E-Tests und erzwungenen Quality Gates."},
    en:{m:"System · private · 87 commits", t:"Object engine with relations, versions and an event timeline. Layered into domain / application / infrastructure / features, with end-to-end tests and enforced quality gates."} },
  { id:"mp", label:"Milano Pizzeria", kind:"system", x:.71, y:.72, live:1, go:"#work",
    de:{m:"System · in Produktion", t:"Restaurant-Plattform für einen Betrieb in Duisburg. Gäste stellen die Reservierung auf der Seite zusammen; sie wird vorausgefüllt an WhatsApp übergeben — sie drücken nur noch Senden."},
    en:{m:"System · in production", t:"Restaurant platform for a business in Duisburg. Guests assemble a reservation on the site; it is handed to WhatsApp pre-filled, so they only press send."} },
  { id:"ts", label:"TypeScript", kind:"tech", x:.50, y:.45, go:"#tools",
    de:{m:"Sprache", t:"Die Sprache, in der beide Systeme geschrieben sind."},
    en:{m:"Language", t:"The language both systems are written in."} },
  { id:"next", label:"Next.js", kind:"tech", x:.53, y:.12, go:"#tools",
    de:{m:"Framework", t:"App Router in beiden Systemen, serverseitig gerendert."},
    en:{m:"Framework", t:"App Router in both systems, server-rendered."} },
  { id:"pg", label:"PostgreSQL", kind:"tech", x:.13, y:.50, go:"#tools",
    de:{m:"Datenbank", t:"Relationales Schema hinter der Objekt-Engine, migriert über Drizzle."},
    en:{m:"Database", t:"Relational schema behind the object engine, migrated with Drizzle."} },
  { id:"dz", label:"Drizzle ORM", kind:"tech", x:.07, y:.22, go:"#tools",
    de:{m:"Datenzugriff", t:"Typsichere Queries und committete Migrationen."},
    en:{m:"Data access", t:"Type-safe queries and committed migrations."} },
  { id:"sb", label:"Supabase", kind:"tech", x:.27, y:.03, go:"#tools",
    de:{m:"Auth · Storage", t:"Authentifizierung und privater Datei-Speicher in ChoumarOS."},
    en:{m:"Auth · storage", t:"Authentication and private file storage in ChoumarOS."} },
  { id:"pw", label:"Playwright", kind:"tech", x:.06, y:.79, go:"#tools",
    de:{m:"E2E-Tests", t:"Durchgehende Browser-Tests, die vor jedem Release grün sein müssen."},
    en:{m:"E2E tests", t:"End-to-end browser tests that must pass before any release."} },
  { id:"vc", label:"Vercel", kind:"tech", x:.91, y:.47, go:"#tools",
    de:{m:"Hosting · fra1", t:"Frankfurt — die Region, die am nächsten an den Gästen liegt."},
    en:{m:"Hosting · fra1", t:"Frankfurt — the region closest to the guests."} },
  { id:"java", label:"Java", kind:"tech", x:.79, y:.23, go:"#study",
    de:{m:"Sprache · Studium", t:"Aus dem Studium: Algorithmen, OOP, saubere Struktur."},
    en:{m:"Language · degree", t:"From the degree: algorithms, OOP, clean structure."} },
  { id:"py", label:"Python", kind:"tech", x:.91, y:.08, go:"#study",
    de:{m:"Sprache · Studium", t:"Skripte, Automatisierung, Datenaufbereitung."},
    en:{m:"Language · degree", t:"Scripts, automation, preparing data."} },
  { id:"de", label:"Deutsch C1", kind:"sprache", x:.46, y:.92, go:"#lang",
    de:{m:"Sprache · fließend", t:"Die Milano-Plattform ist vollständig auf Deutsch — inklusive Impressum und Datenschutz nach DSGVO. Die Sprache ist Teil der Arbeit, nicht nur des Lebenslaufs."},
    en:{m:"Language · fluent", t:"The Milano platform is entirely in German — including Impressum and Datenschutz under GDPR. The language is part of the work, not just the CV."} },
  { id:"ar", label:"العربية", kind:"sprache", x:.21, y:.94, go:"#lang",
    de:{m:"Muttersprache", t:"Muttersprache."},
    en:{m:"Native language", t:"Native language."} },
  { id:"en", label:"English A2", kind:"sprache", x:.70, y:.94, go:"#lang",
    de:{m:"Sprache · Grundlagen", t:"Dokumentation und Code auf Englisch; im Gespräch noch im Aufbau."},
    en:{m:"Language · elementary", t:"Documentation and code in English; conversation still developing."} },
  { id:"ai", label:"KI-Agenten", kind:"tech", x:.73, y:.37, go:"#ai",
    de:{m:"Arbeitsweise", t:"Beide Systeme sind entstanden, indem KI-Agenten gezielt geführt wurden: Spezifikation, Ausführung, Prüfung. Das ist die eigentliche Fertigkeit — nicht das Werkzeug."},
    en:{m:"Method", t:"Both systems were built by directing AI agents: specify, execute, verify. That is the actual skill — not the tool."} }
];
var EDGES = [["os","ts"],["os","next"],["os","pg"],["os","dz"],["os","sb"],["os","pw"],["os","ai"],
  ["mp","ts"],["mp","next"],["mp","vc"],["mp","de"],["mp","ai"],["pg","dz"],["ts","next"],["ar","de"],["de","en"]];

var BENCH = [
  { fig:"87", unit:{de:"Commits",en:"commits"},
    de:{h:"Ausdauer", p:"ChoumarOS hat mir niemand aufgetragen. Ich bin 87 Commits drangeblieben, weil ich es richtig haben wollte, nicht fertig."},
    en:{h:"Endurance", p:"Nobody assigned me ChoumarOS. I kept going for 87 commits because I wanted it right, not finished."} },
  { fig:"6", unit:{de:"Quality Gates",en:"quality gates"},
    de:{h:"Sorgfalt", p:"format · lint · typecheck · test · e2e · build — alle sechs laufen durch, bevor etwas rausgeht. Die Regel habe ich mir selbst gesetzt, und ich überspringe sie auch nicht, wenn es spät wird."},
    en:{h:"Care", p:"format · lint · typecheck · test · e2e · build — all six pass before anything ships. I set that rule for myself, and I don't skip it when it gets late."} },
  { fig:"1", unit:{de:"System live",en:"system live"},
    de:{h:"Ausgeliefert", p:"Milano Pizzeria bedient einen echten Betrieb in Duisburg. Echte Gäste, echte Reservierungen. Ich weiß, was „fertig“ heißt, wenn jemand darauf angewiesen ist."},
    en:{h:"Shipped", p:"Milano Pizzeria serves a real business in Duisburg. Real guests, real reservations. I know what “done” means when someone depends on it."} },
  { de:{h:"Lernen durch Bauen", p:"Vor Milano hatte ich noch nie eine Seite in Produktion gebracht. Geben Sie mir etwas, das ich noch nicht kann, und eine echte Frist — so lerne ich am schnellsten."},
    en:{h:"Learning by building", p:"Before Milano I had never put a site into production. Give me something I don't know yet and a real deadline — that is the fastest I learn."} },
  { fig:"3", unit:{de:"Sprachen",en:"languages"},
    de:{h:"Sprache und Kontext", p:"Deutsch fließend, Arabisch Muttersprache, English. Milano hat Impressum und Datenschutz, weil ich weiß, was ein deutscher Betrieb braucht — das musste mir niemand sagen."},
    en:{h:"Language and context", p:"German fluent, Arabic native, English. Milano ships with Impressum and Datenschutz because I know what a German business needs — nobody had to tell me."} },
  { de:{h:"Klar kommunizieren", p:"Lesen Sie meine Commit-Nachrichten: Sie sagen, was sich geändert hat und warum. Ich frage früh nach, wenn etwas unklar ist, und werde im Review nicht still."},
    en:{h:"Clear communication", p:"Read my commit messages: they say what changed and why. I ask early when something is unclear, and I don't go quiet in review."} },
  { de:{h:"Im Team arbeiten", p:"Ich will mit Leuten arbeiten, die besser sind als ich. Eine Korrektur nehme ich als Information, nicht als Kritik."},
    en:{h:"Working in a team", p:"I want to work with people who are better than me. I take a correction as information, not as criticism."} },
  { de:{h:"Verbindlichkeit", p:"Ich sage, was ich liefere und bis wann. Wenn etwas rutscht, hören Sie es von mir — nicht am Abgabetag."},
    en:{h:"Reliability", p:"I say what I'll deliver and by when. If something slips you hear it from me — not on the deadline."} },
  { de:{h:"Wo ich wirklich stehe", p:"Meine Erfahrung ist kurz. Mein Nachweis ist echt. Ich suche die Jahre — und ich bringe die Stunden dafür mit."},
    en:{h:"Where I actually am", p:"My experience is short. My record is real. I'm looking for the years — and I'll put in the hours for them."} }
];

var PROJECTS = [
  { badge:"live", badgeT:{de:"In Produktion",en:"In production"},
    h:"Milano Pizzeria", link:"https://milano-pizzeria-duisburg.dev/",
    linkT:{de:"Live ansehen",en:"View live"},
    de:{p:"Restaurant-Plattform für einen Betrieb in Duisburg. Deutschsprachig, mobile-first und rechtlich vollständig — Impressum und Datenschutz nach DSGVO.",
        li:["Reservierung wird auf der Seite zusammengestellt und vorausgefüllt an WhatsApp übergeben — bewusst statt eines Buchungs-Backends, weil der Betrieb kein Personal für ein Dashboard hat.","Bestellung übergibt an die bestehende Seite des Restaurants; hier wird keine Zahlung verarbeitet.","Security-Header an der Edge: X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy."]},
    en:{p:"Restaurant platform for a business in Duisburg. German-language, mobile-first and legally complete — Impressum and Datenschutz under GDPR.",
        li:["The reservation is assembled on the site and handed to WhatsApp pre-filled — deliberately instead of a booking backend, because the business has no staff to watch a dashboard.","Ordering hands off to the restaurant's existing site; no payment is processed here.","Security headers at the edge: X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy."]},
    chips:["Next.js","TypeScript","Tailwind","WhatsApp Deep Link","Vercel · fra1"] },
  { badge:"privat", badgeT:{de:"Privates Repository",en:"Private repository"},
    h:"ChoumarOS",
    de:{p:"Eine geschichtete Plattform, die ich über 87 Commits entworfen und gebaut habe. Kein Auftrag — ich wollte wissen, ob ich ein System dieser Größe sauber durchhalte.",
        li:["Objekt-Engine: Objekte, Sub-Objekte, Relationen, Versionen und eine Event-Timeline.","Geschichtet in domain / application / infrastructure / features.","Grounded AI, ein dauerhafter Automations-Worker, privater Datei-Speicher, installierbar als PWA.","Abgesichert durch End-to-End-Tests; sechs Quality Gates laufen vor jedem Release."]},
    en:{p:"A layered platform I designed and built across 87 commits. Not a commission — I wanted to know whether I could hold a system of this size together cleanly.",
        li:["Object engine: objects, sub-objects, relations, versions and an event timeline.","Layered into domain / application / infrastructure / features.","Grounded AI, a durable automation worker, private file storage, installable as a PWA.","Covered by end-to-end tests; six quality gates run before every release."]},
    chips:["Next.js","TypeScript","Drizzle ORM","PostgreSQL","Supabase","Zod","Playwright","Vitest"] },
  { badge:"wip", badgeT:{de:"In Arbeit",en:"In progress"},
    h:{de:"Website für einen Verein",en:"Website for an association"},
    de:{p:"Ein deutscher Verein, dessen Mitglieder jährlich einzahlen; stirbt ein Mitglied, trägt der Verein die Überführung in das Heimatland. Baubeginn in Kürze.",
        li:["Mitgliederdaten und Todesmeldungen sind besonders schützenswert — Datenschutz ist hier keine Formalie, sondern die eigentliche Anforderung.","Datensparsamkeit, klare Löschfristen und eine Sprache, die dem Anlass angemessen ist.","Name und Ansichten folgen, sobald der Verein zugestimmt hat."]},
    en:{p:"A German association whose members contribute annually; when a member dies, the association covers repatriation to their home country. Building starts shortly.",
        li:["Member records and death notifications are sensitive personal data — privacy here is not a formality, it is the actual requirement.","Data minimisation, clear retention limits, and language appropriate to the occasion.","Name and screenshots follow once the association has agreed."]},
    chips:["Next.js","TypeScript","DSGVO"] }
];

var FACH = {
  se:    { c:"#C0714A", de:"Software Engineering", en:"Software engineering" },
  prak:  { c:"#C9CDD1", de:"Praktische Informatik", en:"Practical computing" },
  theo:  { c:"#4E8C7D", de:"Theoretische Informatik", en:"Theory" },
  sys:   { c:"#A5543C", de:"Systeme & Sicherheit", en:"Systems & security" },
  math:  { c:"#B39355", de:"Mathematik", en:"Mathematics" },
  wahl:  { c:"#5A6469", de:"Wahl & Projekte", en:"Electives & projects" }
};
var SEMS = [
  { n:1, t:"WS", mods:[["Modelle der Informatik","theo"],["Einführung in die Programmierung","prak"],["Einführung in das Software Engineering","se"],["Rechnerstrukturen und Betriebssysteme","prak"],["Lineare Algebra für Informatiker","math"]] },
  { n:2, t:"SS", mods:[["Datenbankmanagementsysteme","prak"],["Datenstrukturen und Algorithmen","prak"],["Cybersicherheit","sys"],["Analysis für Informatiker","math"]] },
  { n:3, t:"WS", mods:[["Berechenbarkeit und Komplexität","theo"],["Requirements Engineering","se"],["Kommunikationsnetze","sys"],["Wahlpflichtmodul I — Wirtschaftsinformatik","wahl"],["Stochastik für Informatiker","math"]] },
  { n:4, t:"SS", mods:[["Software-Architekturen","se"],["Software Entwicklung und Programmierung (SEP)","se"],["Mensch-Computer-Interaktion","sys"],["Seminar","wahl"],["E1: Schlüsselqualifikation","wahl"]] },
  { n:5, t:"WS", mods:[["Grundlagen des maschinellen Lernens","prak"],["Application Management","se"],["Ausgewählte Aspekte des Software Engineerings","se"],["Bachelorprojekt","wahl"],["E3: Studium Liberale","wahl"]] },
  { n:6, t:"SS", now:1, mods:[["Qualitätssicherung und Qualitätsmanagement","se"],["Wahlpflichtmodul II — Informatik","wahl"],["Wahlpflichtmodul III — Informatik","wahl"],["Bachelorarbeit","wahl"]] }
];

var TOOLS = [
  { z:{de:"Sprachen",en:"Languages"}, i:[
    ["TypeScript","built","ChoumarOS · Milano · diese Seite","ChoumarOS · Milano · this site"],
    ["JavaScript","built","Milano · diese Seite","Milano · this site"],
    ["HTML","built","alle drei Systeme","all three systems"],
    ["CSS","built","alle drei Systeme","all three systems"],
    ["SQL","built","ChoumarOS · Studium","ChoumarOS · degree"],
    ["Java","study","Studium","Degree"],
    ["Python","study","Studium · Skripte","Degree · scripts"]] },
  { z:{de:"Framework & UI",en:"Framework & UI"}, i:[
    ["Next.js","built","ChoumarOS · Milano","ChoumarOS · Milano"],
    ["React","built","ChoumarOS · Milano","ChoumarOS · Milano"],
    ["Tailwind CSS","built","Milano","Milano"],
    ["Framer Motion","project","Milano","Milano"],
    ["GSAP","project","diese Seite","this site"]] },
  { z:{de:"Daten",en:"Data"}, i:[
    ["PostgreSQL","built","ChoumarOS","ChoumarOS"],
    ["Drizzle ORM","built","ChoumarOS","ChoumarOS"],
    ["Supabase","built","ChoumarOS","ChoumarOS"],
    ["Zod","built","ChoumarOS · Milano","ChoumarOS · Milano"],
    ["MySQL","project","Studium","Degree"]] },
  { z:{de:"Betrieb",en:"Delivery"}, i:[
    ["Vercel","built","Milano · ChoumarOS",'Milano · ChoumarOS',1],
    ["Git","built","täglich","daily"],
    ["GitHub","built","täglich","daily"],
    ["GitHub Pages","built","diese Seite","this site"],
    ["Docker","project","Studium","Degree"]] },
  { z:{de:"Qualität",en:"Quality"}, i:[
    ["Playwright","built","ChoumarOS","ChoumarOS"],
    ["Vitest","built","ChoumarOS","ChoumarOS"],
    ["ESLint","built","ChoumarOS · Milano","ChoumarOS · Milano"],
    ["TypeScript strict","built","beide Systeme","both systems"]] },
  { z:{de:"Auffindbarkeit & Recht",en:"Findability & law"}, i:[
    ["SEO","built","Sitemap · robots · canonical · OG","sitemap · robots · canonical · OG"],
    ["Search Console","built","verifiziert","verified"],
    ["Impressum & DSGVO","built","Milano","Milano"],
    ["JSON-LD","built","diese Seite","this site"]] },
  { z:{de:"Design & Motion",en:"Design & motion"}, i:[
    ["UI / UX","built","alle drei Systeme","all three systems"],
    ["Canvas 2D","built","Anlagenschema oben","the schematic above"],
    ["Motion Design","built","diese Seite","this site"],
    ["Google Stitch","project","Entwürfe","first drafts"]] },
  { z:{de:"Arbeitsweise",en:"Method"}, i:[
    ["Claude","built","ChoumarOS · Milano","ChoumarOS · Milano"],
    ["Claude Skills","built","wiederholbare Abläufe","repeatable workflows"],
    ["Codex","built","enge Änderungen","contained changes"],
    ["Gemini","built","Recherche","research"],
    ["Gemini Canvas","project","Entwürfe","first drafts"]] }
];

var LOOP = [
  { n:"01", de:{h:"Spezifizieren", p:"Ich schreibe zuerst die Spezifikation: was das System können muss, was es niemals tun darf, und woran ich merke, dass es stimmt."},
             en:{h:"Specify", p:"I write the specification first: what the system must do, what it must never do, and how I will know it is right."} },
  { n:"02", de:{h:"Ausführen", p:"Ich führe den Agenten in Schritten hindurch und korrigiere in dem Moment, in dem das Ergebnis von der Spezifikation abweicht."},
             en:{h:"Execute", p:"I drive the agent through it in steps and correct course the moment the output drifts from the spec."} },
  { n:"03", de:{h:"Prüfen", p:"Ich lese jeden Diff. Sechs Gates laufen durch, bevor etwas rausgeht: format · lint · typecheck · unit · e2e · build."},
             en:{h:"Verify", p:"I read every diff. Six gates pass before anything ships: format · lint · typecheck · unit · e2e · build."} },
  { n:"04", de:{h:"Verantworten", p:"Es geht unter meinem Namen raus. Wenn es um zwei Uhr nachts bricht, repariere ich es."},
             en:{h:"Answer for it", p:"It goes out under my name. If it breaks at 2am, I fix it."} }
];

var CHANNELS = [
  { n:"Claude", de:{r:"Lange, geschichtete Arbeit", p:"Architektur, Refactorings über viele Dateien, Tests schreiben und laufen lassen. Ich baue eigene Skills und binde Connectors an, damit ein Ablauf jedes Mal gleich läuft — das ist der Unterschied zwischen einem Chatbot benutzen und einen Prozess führen."},
              en:{r:"Long, layered work", p:"Architecture, refactors across many files, writing and running the tests. I build custom Skills and wire connectors so a workflow runs the same way every time — that is the difference between using a chatbot and running a process."} },
  { n:"Codex", de:{r:"Enge Änderungen", p:"Schnelle, abgegrenzte Eingriffe in einer Codebasis, die ich schon kenne."},
              en:{r:"Contained changes", p:"Fast, bounded edits inside a codebase I already know."} },
  { n:"Gemini", de:{r:"Recherche", p:"Breite Recherche und das Vergleichen von Ansätzen, bevor ich mich auf einen festlege."},
              en:{r:"Research", p:"Wide research and comparing approaches before I commit to one."} },
  { n:"Stitch · Canvas", de:{r:"Erste Entwürfe", p:"Oberflächen erkunden, bevor ich das Echte baue."},
              en:{r:"First drafts", p:"Exploring interfaces before I build the real thing."} }
];

var EVENTS = [
  { cls:"bg", yr:"2023 →", de:{h:"B.Sc. Software Engineering · Uni Duisburg-Essen", p:"Läuft seit 2023, aktuell im sechsten Fachsemester."},
    en:{h:"B.Sc. Software Engineering · University of Duisburg-Essen", p:"Running since 2023, currently in the sixth semester."} },
  { yr:"2026", de:{h:"Milano Pizzeria geht live", p:"Zum ersten Mal bedient mein Code einen echten Betrieb, mit einem echten Kunden auf der anderen Seite."},
    en:{h:"Milano Pizzeria goes live", p:"The first time my code serves a real business, with a real client on the other side."} },
  { yr:"2026", de:{h:"ChoumarOS · 87 Commits", p:"Geschichtete Architektur, End-to-End getestet. Niemand hat es beauftragt."},
    en:{h:"ChoumarOS · 87 commits", p:"Layered architecture, end-to-end tested. Nobody assigned it."} },
  { cls:"open", yr:"Jetzt", yrEn:"Now", de:{h:"Bereit für den nächsten Schritt", p:"Ich suche eine Werkstudenten- oder Praktikumsstelle im Ruhrgebiet, in einem Team, von dem ich lernen kann."},
    en:{h:"Ready for the next step", p:"Looking for a Werkstudent or internship place in the Ruhrgebiet, on a team I can learn from."} }
];

var CEFR = ["A1","A2","B1","B2","C1","C2"];
var LANGS = [
  { name:"English", lvl:1, col:"var(--rohstahl)", de:"Dokumentation, Code und diese Seite.", en:"Documentation, code and this site." },
  { name:"Deutsch", lvl:4, col:"var(--kupfer)", de:"Studium, Alltag und die gesamte Milano-Plattform inklusive Impressum und Datenschutz.", en:"Studies, daily life, and the whole Milano platform including Impressum and Datenschutz." },
  { name:"العربية", lvl:6, col:"var(--gruenspan)", de:"Muttersprache.", en:"Native language." }
];

var CHECKS = [
  { de:"Search-Console-Property verifiziert", en:"Search Console property verified", v:"" },
  { de:"sitemap.xml eingereicht", en:"sitemap.xml submitted", v:"01.09.2026" },
  { de:"robots.txt mit Sitemap-Verweis", en:"robots.txt with sitemap directive", v:"" },
  { de:"Canonical-URL gesetzt", en:"Canonical URL set", v:"" },
  { de:"Open Graph + Vorschaubild", en:"Open Graph + preview image", v:"" },
  { de:"HTTPS erzwungen", en:"HTTPS enforced", v:"0 / 90 T" },
  { de:"Indexierung ohne Fehler", en:"Indexing with no errors", v:"0" },
  { de:"Strukturierte Daten (JSON-LD)", en:"Structured data (JSON-LD)", v:"Person" },
  { de:"Datenschutzhinweis vorhanden", en:"Privacy notice in place", v:"" }
];

var T = {
  "skip":"Skip to content",
  "menu":"Menu", "close":"Close", "status":"Available · working student",
  "nav.about":"About", "nav.whoami":"whoami", "nav.bench":"Test bench", "nav.work":"Projects", "nav.study":"Degree",
  "nav.tools":"Tools", "nav.ai":"Method", "nav.path":"Path", "nav.lang":"Languages",
  "nav.seo":"Findability", "nav.kontakt":"Contact",
  "hero.lede":"Software engineering student who <strong class=\"em\">builds real systems</strong> — one runs in production for a business in Duisburg, one is an object system of 87 commits.",
  "spec.studium":"Degree", "spec.studium.v":"B.Sc. University of Duisburg-Essen · 6th semester",
  "spec.studium.long":"B.Sc. Software Engineering · University of Duisburg-Essen",
  "spec.sprachen":"Languages", "spec.sprachen.long":"German C1 · <span class=\"ar\">العربية</span> native · English A2",
  "spec.stack":"Stack", "spec.status":"Status", "spec.status.v":"Working student · internship · available now",
  "spec.ort":"Location", "spec.ort.v":"Essen · Ruhr area · remote possible",
  "cta.contact":"Send a message", "cta.work":"See the projects",
  "schema.head":"System schematic",
  "eb.about":"About me",
  "about.h":"No job title yet.<em>Systems that run.</em>",
  "about.p1":"I'm in my sixth semester of Software Engineering at the University of Duisburg-Essen. I understand a subject once I've built something with it that other people actually use.",
  "about.p2":"Two systems came out of that. <strong class=\"em\">Milano Pizzeria</strong> runs in production for a business in Duisburg — in German, mobile-first, with Impressum and Datenschutz, and a reservation that arrives pre-filled in WhatsApp. <strong class=\"em\">ChoumarOS</strong> is a layered platform of 87 commits: an object engine with relations, versions and an event timeline, covered by end-to-end tests.",
  "about.p3":"I built both by <strong class=\"em\">directing AI agents</strong>: writing the specification, driving the execution, verifying the result myself. The tools change every few months — specifying a system precisely and checking that it holds does not.",
  "about.p4":"I speak German fluently, Arabic natively, and work in English. I'm looking for a working-student or internship place in the Ruhr area, on a team I can learn from.",
  "eb.whoami":"whoami", "whoami.h":"The short version —<em>in the terminal.</em>",
  "ph.badge":"Available", "ph.focus":"Focus",
  "eb.bench":"Test bench · 09 positions",
  "bench.h":"What I bring —<em>and how you can check it.</em>",
  "bench.lede":"Every position hangs on something verifiable. Anyone can write adjectives.",
  "eb.work":"Projects", "work.h":"Two systems.<em>One runs in production.</em>",
  "eb.study":"Course of study", "study.h":"What the degree<em>covers.</em>",
  "study.lede":"The official course plan of the B.Sc. Software Engineering at the University of Duisburg-Essen. I'm in the sixth semester.",
  "eb.tools":"Tool wall", "tools.h":"The tools that<em>are actually on the board.</em>",
  "tools.lede":"No percentage bars. Instead of a self-assessment, each tool says where I have used it.",
  "eb.ai":"Control desk", "ai.h":"I don't write every line.<em>I answer for every line.</em>",
  "ai.lede":"Two systems came out of this way of working — one of them runs in production for a paying business. The method is the point, not the tool.",
  "eb.path":"The path", "path.h":"Studying —<em>and shipping twice along the way.</em>",
  "eb.lang":"Languages", "lang.h":"Three languages,<em>one of them counts most here.</em>",
  "lang.lede":"By the Common European Framework — the scale you already read.",
  "eb.seo":"Inspection report", "seo.h":"Search engines can read<em>everything I build.</em>",
  "seo.p1":"Not a marketing promise but a configuration you can check: verified Search Console property, submitted sitemap, clean indexing, enforced HTTPS, structured data.",
  "seo.p2":"Milano added the local part: German-language, server-rendered pages with Impressum and Datenschutz — because a business in Duisburg has to be found by people in Duisburg.",
  "eb.kontakt":"Contact", "kontakt.h":"Write to me —<em>or take the card with you.</em>",
  "form.head":"Work order", "form.name":"Name", "form.mail":"E-mail", "form.topic":"What is it about?",
  "form.msg":"Message", "form.send":"Send",
  "form.privacy":"Your details are used only to reply to you, and are not stored or passed on. More in the <a href=\"datenschutz.html\">privacy notice</a>.",
  "karte.sub":"Software engineering · Essen",
  "karte.note":"Scanning saves my contact details straight to the phone.",
  "karte.dl":"Download the card",
  "colophon":"Built in Essen · Bricolage Grotesque &amp; IBM Plex · source on GitHub",
  "foot.impressum":"Legal notice", "foot.datenschutz":"Privacy",
  "stamp.date":"06.09.2026"
};
var TOPICS = { de:["Werkstudent","Praktikum","Projekt","Anderes"], en:["Working student","Internship","Project","Other"] };
var UI = {
  de:{ sending:"Wird gesendet …", okTitle:"EINGEGANGEN", okSub:"Ich melde mich zurück.",
       errH:"Die Nachricht ging nicht raus.", errP:"Schreiben Sie mir bitte direkt an",
       fill:"Bitte Name, E-Mail und Nachricht ausfüllen.", badmail:"Diese E-Mail-Adresse sieht nicht gültig aus.",
       qrNote:{vcard:"Scannen speichert meine Kontaktdaten direkt im Telefon.", site:"Scannen öffnet diese Seite auf dem Telefon.", li:"Scannen öffnet mein LinkedIn-Profil."},
       jump:"Springen zu …", built:"gebaut", project:"im Projekt", study:"Studium",
       legend:["● gebaut — in einem System, das ausgeliefert ist","◐ im Projekt eingesetzt","○ aus dem Studium"],
       modOf:"Module im", sem:"Fachsemester", now:"aktuell" },
  en:{ sending:"Sending …", okTitle:"RECEIVED", okSub:"I'll get back to you.",
       errH:"The message did not go out.", errP:"Please write to me directly at",
       fill:"Please fill in name, e-mail and message.", badmail:"That e-mail address doesn't look valid.",
       qrNote:{vcard:"Scanning saves my contact details straight to the phone.", site:"Scanning opens this page on the phone.", li:"Scanning opens my LinkedIn profile."},
       jump:"Jump to …", built:"built", project:"in a project", study:"degree",
       legend:["● built — in a system that shipped","◐ used inside a project","○ from the degree"],
       modOf:"Modules in semester", sem:"", now:"current" }
};

var MAIL_USER = "choumarmohamadali", MAIL_HOST = "gmail.com";
var mail = function () { return MAIL_USER + "@" + MAIL_HOST; };

var lang = (localStorage.getItem("werk.lang") === "en") ? "en" : "de";
var L = function (o) { return o && (o[lang] || o.de); };

/* ══ i18n ═══════════════════════════════════════════════════════ */

var ORIG = {};
$$("[data-i18n]").forEach(function (n) { ORIG[n.getAttribute("data-i18n")] = n.innerHTML; });

var META = {
  de: { t: "Mohamad Ali Choumar — Software Engineering, Essen",
        d: "Mohamad Ali Choumar — Software-Engineering-Student an der Universität Duisburg-Essen. Baut Systeme, die in Produktion laufen. TypeScript, Next.js, PostgreSQL. Verfügbar für Werkstudent und Praktikum im Ruhrgebiet." },
  en: { t: "Mohamad Ali Choumar — Software Engineering, Essen",
        d: "Mohamad Ali Choumar — software engineering student at the University of Duisburg-Essen. Builds systems that run in production. TypeScript, Next.js, PostgreSQL. Available for working-student and internship roles in the Ruhr area." }
};
function applyLang() {
  document.documentElement.lang = lang;
  document.title = META[lang].t;
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", META[lang].d);
  $$("[data-i18n]").forEach(function (n) {
    var k = n.getAttribute("data-i18n");
    n.innerHTML = (lang === "en" && T[k]) ? T[k] : ORIG[k];
  });
  $("#btnDe").setAttribute("aria-pressed", String(lang === "de"));
  $("#btnEn").setAttribute("aria-pressed", String(lang === "en"));
  $("#cmdkInput").placeholder = UI[lang].jump;
  renderAll();
}
$("#btnDe").addEventListener("click", function () { lang = "de"; localStorage.setItem("werk.lang", "de"); applyLang(); });
$("#btnEn").addEventListener("click", function () { lang = "en"; localStorage.setItem("werk.lang", "en"); applyLang(); });

/* ══ CURSOR + RIPPLE ════════════════════════════════════════════ */

if (!COARSE) {
  var dot = $("#curDot"), ring = $("#curRing");
  var rx = innerWidth / 2, ry = innerHeight / 2, tx = rx, ty = ry;
  addEventListener("pointermove", function (e) {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = "translate(" + tx + "px," + ty + "px)";
    var t = e.target.closest("a,button,.tool,.node,.proj,.pos,.strat,input,textarea");
    ring.setAttribute("data-hot", t ? "true" : "false");
  }, { passive: true });
  (function loop() {
    rx += (tx - rx) * .18; ry += (ty - ry) * .18;
    ring.style.transform = "translate(" + rx + "px," + ry + "px)";
    requestAnimationFrame(loop);
  })();
  if (!STILL) {
    addEventListener("pointerdown", function (e) {
      var r = el("div", "ripple");
      r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
      document.body.appendChild(r);
      setTimeout(function () { r.remove(); }, 640);
    }, { passive: true });
  }
}

/* ══ ANLAGENSCHEMA ══════════════════════════════════════════════ */

var byId = {}, adj = {};
NODES.forEach(function (n) { byId[n.id] = n; adj[n.id] = []; });
EDGES.forEach(function (e) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });

var stage = $("#stage"), cv = $("#cv"), ctx = cv.getContext("2d"), ro = $("#readout");
var nodeEls = {}, active = "os", W = 0, H = 0, tNow = 0;

NODES.forEach(function (n) {
  var b = el("button", "node");
  b.type = "button"; b.dataset.kind = n.kind;
  if (n.live) b.dataset.live = "1";
  b.innerHTML = '<i class="pip"></i><span></span>';
  b.lastChild.textContent = n.label;
  b.addEventListener("mouseenter", function () { pick(n.id); });
  b.addEventListener("focus", function () { pick(n.id); });
  b.addEventListener("click", function () {
    if (active === n.id && n.go) { var d = $(n.go); if (d) d.scrollIntoView({ behavior: STILL ? "auto" : "smooth" }); }
    pick(n.id);
  });
  stage.appendChild(b);
  nodeEls[n.id] = b;
});

function pick(id) {
  active = id;
  var near = adj[id].concat([id]);
  NODES.forEach(function (n) {
    nodeEls[n.id].classList.toggle("on", n.id === id);
    nodeEls[n.id].classList.toggle("dim", near.indexOf(n.id) === -1);
  });
  var n = byId[id], d = L(n), rel = adj[id].map(function (r) { return byId[r].label; });
  ro.innerHTML = '<span class="kind"></span><h3></h3><p></p>' + (rel.length ? '<p class="rel"></p>' : "");
  $(".kind", ro).innerHTML = esc(d.m) + (n.live ? ' · <span class="live">LIVE</span>' : "");
  $("h3", ro).textContent = n.label;
  $("p", ro).textContent = d.t;
  if (rel.length) $(".rel", ro).innerHTML = (lang === "de" ? "Verbunden mit " : "Connected to ") + "<b>" + esc(rel.join(" · ")) + "</b>";
}

function sizeCanvas() {
  var r = stage.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
  W = r.width; H = r.height;
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
var PAD = 48;
function nodePos(n, i) {
  var dx = STILL ? 0 : Math.sin(tNow / 2400 + i * 1.7) * 5;
  var dy = STILL ? 0 : Math.cos(tNow / 3100 + i * 2.3) * 5;
  return { x: PAD + n.x * Math.max(W - PAD * 2, 10) + dx,
           y: PAD * .6 + n.y * Math.max(H - PAD * 1.2, 10) + dy };
}
function drawSchema(now) {
  tNow = now || 0;
  ctx.clearRect(0, 0, W, H);
  var P = {}; NODES.forEach(function (n, i) { P[n.id] = nodePos(n, i); });
  var near = adj[active].concat([active]);
  EDGES.forEach(function (e) {
    var a = P[e[0]], b = P[e[1]], hot = e[0] === active || e[1] === active;
    if (hot) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "rgba(192,113,74,.16)"; ctx.lineWidth = 5; ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = hot ? "rgba(192,113,74,.85)" : "rgba(90,100,105,.26)";
    ctx.lineWidth = hot ? 1.5 : 1; ctx.stroke();
  });
  NODES.forEach(function (n) {
    var p = P[n.id], e = nodeEls[n.id];
    e.style.transform = "translate(" + p.x + "px," + p.y + "px) translate(-50%,-50%)";
    ctx.beginPath(); ctx.arc(p.x, p.y, n.kind === "system" ? 5 : 3, 0, 6.2832);
    ctx.fillStyle = n.live ? "#E8B93A" : n.kind === "system" ? "#C0714A" : n.kind === "sprache" ? "#4E8C7D" : "#5A6469";
    ctx.globalAlpha = near.indexOf(n.id) === -1 ? .3 : 1;
    ctx.fill(); ctx.globalAlpha = 1;
  });
  requestAnimationFrame(drawSchema);
}

/* ══ RENDERERS ══════════════════════════════════════════════════ */

function renderBench() {
  var g = $("#benchGrid"); g.innerHTML = "";
  BENCH.forEach(function (b) {
    var d = L(b), c = el("div", "pos rise" + (b.fig ? "" : " nofig"));
    c.innerHTML = '<i class="pled"></i>' +
      (b.fig ? '<div class="fig">' + esc(b.fig) + '</div><div class="unit">' + esc(L(b.unit)) + '</div>' : "") +
      '<h3>' + esc(d.h) + '</h3><p>' + esc(d.p) + '</p>';
    tilt(c); g.appendChild(c);
  });
}

function renderProjects() {
  var g = $("#projGrid"); g.innerHTML = "";
  PROJECTS.forEach(function (p) {
    var d = L(p), c = el("div", "proj rise");
    var title = typeof p.h === "string" ? p.h : L(p.h);
    var li = d.li.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    c.innerHTML = '<div class="ptop"><span class="badge ' + p.badge + '">' + esc(L(p.badgeT)) + '</span></div>' +
      '<h3>' + esc(title) + '</h3><p>' + esc(d.p) + '</p><ul>' + li + '</ul>' +
      '<div class="chips">' + p.chips.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join("") + '</div>' +
      (p.link ? '<a class="plink" href="' + p.link + '" target="_blank" rel="noopener">' + esc(L(p.linkT)) + ' ↗</a>' : "");
    tilt(c); g.appendChild(c);
  });
}

var semOpen = 5;
function renderCore() {
  var core = $("#core"); core.innerHTML = "";
  SEMS.forEach(function (s, i) {
    var b = el("button", "strat" + (i === semOpen ? " on" : ""));
    b.type = "button";
    if (s.now) b.dataset.now = "1";
    b.innerHTML = "<span>" + s.n + ". FS · " + s.t + "</span>" + (s.now ? '<span class="now">' + esc(UI[lang].now) + "</span>" : "");
    b.addEventListener("click", function () { semOpen = i; renderCore(); renderMods(); });
    b.addEventListener("mouseenter", function () { semOpen = i; renderCore(); renderMods(); });
    core.appendChild(b);
  });
}
function renderMods() {
  var m = $("#mods"); m.innerHTML = "";
  SEMS[semOpen].mods.forEach(function (x) {
    var f = FACH[x[1]], d = el("div", "mod");
    d.style.setProperty("--fach", f.c);
    d.innerHTML = esc(x[0]) + "<small>" + esc(L(f)) + "</small>";
    m.appendChild(d);
  });
  var lg = $("#fachLegend"); lg.innerHTML = "";
  Object.keys(FACH).forEach(function (k) {
    lg.appendChild(el("span", "", '<i style="background:' + FACH[k].c + '"></i>' + esc(L(FACH[k]))));
  });
}

function renderTools() {
  var b = $("#board"); b.innerHTML = "";
  TOOLS.forEach(function (z) {
    var zone = el("div", "zone");
    zone.appendChild(el("div", "zone-h", esc(L(z.z))));
    var row = el("div", "tools");
    z.i.forEach(function (t) {
      var mark = t[1] === "built" ? "●" : t[1] === "project" ? "◐" : "○";
      var w = lang === "de" ? t[2] : t[3];
      var n = el("span", "tool");
      n.tabIndex = 0; n.dataset.p = t[1];
      if (t[4]) n.dataset.live = "1";
      n.innerHTML = '<span class="prov">' + mark + '</span>' + esc(t[0]) + '<span class="where">' + esc(w) + '</span>';
      row.appendChild(n);
    });
    zone.appendChild(row); b.appendChild(zone);
  });
  var lg = el("div", "legend");
  UI[lang].legend.forEach(function (x) { lg.appendChild(el("span", "", esc(x))); });
  b.appendChild(lg);
}

function renderLoop() {
  var g = $("#loop"); g.innerHTML = "";
  LOOP.forEach(function (s) {
    var d = L(s);
    g.appendChild(el("div", "step", '<div class="n">' + s.n + '</div><h3>' + esc(d.h) + '</h3><p>' + esc(d.p) + '</p>'));
  });
  var c = $("#channels"); c.innerHTML = "";
  CHANNELS.forEach(function (ch) {
    var d = L(ch);
    c.appendChild(el("div", "chan rise", '<div class="cname">' + esc(ch.n) + '</div><div class="crole">' + esc(d.r) + '</div><p>' + esc(d.p) + '</p>'));
  });
}

function renderEvents() {
  var g = $("#events"); g.innerHTML = "";
  EVENTS.forEach(function (e) {
    var d = L(e), n = el("div", "ev rise " + (e.cls || ""));
    n.innerHTML = '<span class="yr">' + esc(lang === "en" && e.yrEn ? e.yrEn : e.yr) + '</span><span class="mk"></span>' +
      '<h3>' + esc(d.h) + '</h3><p>' + esc(d.p) + '</p>';
    g.appendChild(n);
  });
  var bar = $("#studyBar"), first = $(".ev.bg"), last = g.lastElementChild;
  if (bar && first && last) {
    bar.style.top = (first.offsetTop + 4) + "px";
    bar.style.height = Math.max(last.offsetTop - first.offsetTop, 40) + "px";
  }
}

function renderCefr() {
  var c = $("#cefr");
  c.innerHTML = '<div class="cefr-line" id="cefrLine"></div>';
  var line = $("#cefrLine");
  var stops = CEFR.concat([lang === "de" ? "Muttersprache" : "Native"]);
  stops.forEach(function (s, i) {
    var t = el("div", "cefr-tick", "<span>" + esc(s) + "</span>");
    t.style.left = (i / (stops.length - 1) * 100) + "%";
    line.appendChild(t);
  });
  LANGS.forEach(function (lg) {
    var m = el("div", "marker");
    m.tabIndex = 0;
    m.innerHTML = '<span class="lbl" style="color:' + lg.col + '">' + esc(lg.name) + '</span>' +
                  '<span class="pin" style="background:' + lg.col + '"></span>' +
                  '<span class="prov2">' + esc(L(lg)) + '</span>';
    m.style.left = "0%";
    line.appendChild(m);
    requestAnimationFrame(function () {
      setTimeout(function () { m.style.left = (lg.lvl / (stops.length - 1) * 100) + "%"; }, 60);
    });
  });
}

function renderChecks() {
  var u = $("#checks"); u.innerHTML = "";
  CHECKS.forEach(function (c) {
    var li = el("li", "", '<i>✓</i><span>' + esc(L(c)) + '</span>' + (c.v ? "<b>" + esc(c.v) + "</b>" : ""));
    u.appendChild(li);
  });
}

function renderTopics() {
  var g = $("#topics"); g.innerHTML = "";
  TOPICS[lang].forEach(function (t, i) {
    var b = el("button", "topic"); b.type = "button"; b.textContent = t;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      $$(".topic", g).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
    });
    g.appendChild(b);
  });
}

function renderDirect() {
  var d = $("#direct"); d.innerHTML = "";
  var rows = [
    ["E-Mail", mail(), "mailto:" + mail()],
    ["GitHub", "MAliChoumar", "https://github.com/MAliChoumar"],
    ["LinkedIn", "Mohamad Ali Choumar", "https://www.linkedin.com/in/mohamadalichoumar/"]
  ];
  rows.forEach(function (r) {
    var a = el("a", "", "<span>" + esc(r[0]) + "</span>" + esc(r[1]));
    a.href = r[2];
    if (r[2].indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
    d.appendChild(a);
  });
}

function renderAll() {
  renderBench(); renderProjects(); renderCore(); renderMods(); renderTools();
  renderLoop(); renderEvents(); renderCefr(); renderChecks(); renderTopics(); renderDirect();
  $("#nodeCount").textContent = NODES.length + (lang === "de" ? " Objekte" : " objects");
  $("#qrNote").textContent = UI[lang].qrNote[qrMode];
  pick(active);
  if (termRan) runTerm();
  observe();
}

/* ══ 3D TILT + SPECULAR ═════════════════════════════════════════ */

function tilt(node) {
  if (COARSE || STILL) return;
  node.addEventListener("pointermove", function (e) {
    var r = node.getBoundingClientRect();
    var px = e.clientX - r.left, py = e.clientY - r.top;
    node.style.setProperty("--mx", px + "px");
    node.style.setProperty("--my", py + "px");
    var rx = ((py / r.height) - .5) * -5, ry = ((px / r.width) - .5) * 5;
    node.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(0)";
  });
  node.addEventListener("pointerleave", function () {
    node.style.transform = "";
    node.style.setProperty("--mx", "-300px");
    node.style.setProperty("--my", "-300px");
  });
}

var portrait = $("#portrait");
if (portrait && !COARSE) {
  portrait.addEventListener("pointermove", function (e) {
    var r = portrait.getBoundingClientRect();
    portrait.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
    portrait.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
  });
}

/* ══ REVEAL / SCROLLSPY / PROGRESS ══════════════════════════════ */

var io = null, revealTimer = null;
function revealAll() {
  $$(".rise").forEach(function (n) { n.classList.remove("armed"); n.classList.add("in"); });
}
function observe() {
  if (STILL || !("IntersectionObserver" in window)) { revealAll(); return; }
  if (io) io.disconnect();
  io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
  $$(".rise").forEach(function (n) {
    var r = n.getBoundingClientRect();
    // Already on screen? show it now — a reveal is an arrival, not a gate.
    if (r.top < innerHeight && r.bottom > 0) { n.classList.add("in"); return; }
    n.classList.add("armed");
    io.observe(n);
  });
  // Safety net, but not a guillotine: the old version revealed everything after
  // four seconds, which killed the entrance animation for anything the reader
  // had not scrolled to yet. Now it only intervenes if the observer is clearly
  // not working at all.
  clearTimeout(revealTimer);
  revealTimer = setTimeout(function () {
    var revealed = $$(".rise.in").length;
    if (revealed === 0) revealAll();
  }, 3000);
}

var sections = ["about","bench","work","study","tools","ai","path","lang","seo","kontakt"];
function onScroll() {
  var h = document.documentElement;
  var p = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
  $("#progress").style.width = (p * 100) + "%";

  var cur = "";
  sections.forEach(function (id) {
    var s = document.getElementById(id);
    if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = id;
  });
  $$("#navlinks a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + cur); });

  var rw = $("#railWrap"), rf = $("#railFill");
  if (rw && rf) {
    var r = rw.getBoundingClientRect();
    var v = (innerHeight * .72 - r.top) / Math.max(r.height, 1);
    rf.style.height = Math.max(0, Math.min(1, v)) * (r.height - 12) + "px";
  }

  var lp = $("#loop");
  if (lp && !STILL && lp.getBoundingClientRect().top < innerHeight * .85) lp.classList.add("run");

  var tsh = $("#termShell");
  if (tsh && !termRan && tsh.getBoundingClientRect().top < innerHeight * .8) { termRan = true; runTerm(); }

  var st = $("#stamp");
  if (st && !st.dataset.done && st.getBoundingClientRect().top < innerHeight * .85) {
    st.dataset.done = "1"; if (!STILL) st.classList.add("press");
  }
}
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", function () { sizeCanvas(); renderEvents(); onScroll(); }, { passive: true });

/* ══ NAV: sheet + command palette ═══════════════════════════════ */

var sheet = $("#sheet");
$("#burger").addEventListener("click", function () {
  var open = sheet.dataset.open === "true";
  sheet.dataset.open = String(!open);
  this.setAttribute("aria-expanded", String(!open));
});
$("#sheetClose").addEventListener("click", function () { sheet.dataset.open = "false"; $("#burger").setAttribute("aria-expanded", "false"); });
$$("#sheet a").forEach(function (a) { a.addEventListener("click", function () { sheet.dataset.open = "false"; }); });

var cmdk = $("#cmdk"), cin = $("#cmdkInput"), clist = $("#cmdkList");
function cmdkItems() {
  var out = sections.map(function (id) {
    var a = $('#navlinks a[href="#' + id + '"]');
    return { label: a ? a.textContent : id, hint: "#" + id, act: function () { document.getElementById(id).scrollIntoView({ behavior: STILL ? "auto" : "smooth" }); } };
  });
  out.push({ label: lang === "de" ? "Lebenslauf" : "CV", hint: "↗", act: function () { location.href = "cv.html"; } });
  out.push({ label: "GitHub", hint: "↗", act: function () { open("https://github.com/MAliChoumar", "_blank", "noopener"); } });
  out.push({ label: "LinkedIn", hint: "↗", act: function () { open("https://www.linkedin.com/in/mohamadalichoumar/", "_blank", "noopener"); } });
  out.push({ label: lang === "de" ? "Sprache wechseln" : "Switch language", hint: lang === "de" ? "EN" : "DE",
    act: function () { (lang === "de" ? $("#btnEn") : $("#btnDe")).click(); } });
  return out;
}
function drawCmdk(q) {
  clist.innerHTML = "";
  cmdkItems().filter(function (i) { return !q || i.label.toLowerCase().indexOf(q.toLowerCase()) > -1; })
    .forEach(function (i, k) {
      var b = el("button", k === 0 ? "" : "", esc(i.label) + "<i>" + esc(i.hint) + "</i>");
      if (k === 0) b.dataset.sel = "1";
      b.addEventListener("click", function () { closeCmdk(); i.act(); });
      clist.appendChild(b);
    });
}
function openCmdk() { cmdk.dataset.open = "true"; cin.value = ""; drawCmdk(""); cin.focus(); }
function closeCmdk() { cmdk.dataset.open = "false"; }
$("#cmdkOpen").addEventListener("click", openCmdk);
cmdk.addEventListener("click", function (e) { if (e.target === cmdk) closeCmdk(); });
cin.addEventListener("input", function () { drawCmdk(this.value); });
addEventListener("keydown", function (e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.dataset.open === "true" ? closeCmdk() : openCmdk(); }
  if (e.key === "Escape") { closeCmdk(); sheet.dataset.open = "false"; }
  if (cmdk.dataset.open === "true" && e.key === "Enter") {
    var s = $("button[data-sel]", clist) || $("button", clist);
    if (s) s.click();
  }
});

/* ══ QR + NAMEPLATE ═════════════════════════════════════════════ */

var qrMode = "vcard";
var VCARD = "BEGIN:VCARD\nVERSION:3.0\nN:Choumar;Mohamad Ali;;;\nFN:Mohamad Ali Choumar\nTITLE:Software Engineering Student\nEMAIL;TYPE=INTERNET:" + mail() + "\nURL:https://choumar.is-a.dev/\nADR;TYPE=HOME:;;;Essen;;;Germany\nEND:VCARD";
var QRDATA = { vcard: VCARD, site: "https://choumar.is-a.dev/", li: "https://www.linkedin.com/in/mohamadalichoumar/" };

function buildQrTabs() {
  var g = $("#qrtabs"); g.innerHTML = "";
  [["vcard","vCard"],["site","Portfolio"],["li","LinkedIn"]].forEach(function (t) {
    var b = el("button", "qrtab"); b.type = "button"; b.textContent = t[1];
    b.setAttribute("aria-pressed", String(qrMode === t[0]));
    b.addEventListener("click", function () { qrMode = t[0]; buildQrTabs(); makeQr(); $("#qrNote").textContent = UI[lang].qrNote[qrMode]; });
    g.appendChild(b);
  });
}
function makeQr() {
  var c = $("#qr");
  if (!window.QRCode) return;
  var tmp = el("div");
  new window.QRCode(tmp, { text: QRDATA[qrMode], width: 380, height: 380,
    colorDark: "#12191C", colorLight: "#E8EAEB", correctLevel: window.QRCode.CorrectLevel.M });
  setTimeout(function () {
    var src = tmp.querySelector("canvas") || tmp.querySelector("img");
    if (!src) return;
    var g = c.getContext("2d");
    g.fillStyle = "#E8EAEB"; g.fillRect(0, 0, 190, 190);
    try { g.drawImage(src, 0, 0, 190, 190); } catch (err) { /* image not ready */ }
    buildKarte(src);
  }, 30);
}
function buildKarte(qrSrc) {
  var w = 1000, h = 620, k = document.createElement("canvas");
  k.width = w; k.height = h;
  var g = k.getContext("2d");
  g.fillStyle = "#0B1114"; g.fillRect(0, 0, w, h);
  g.strokeStyle = "#1D2B30"; g.lineWidth = 2; g.strokeRect(14, 14, w - 28, h - 28);
  g.fillStyle = "#162226";
  [[34,34],[w-34,34],[34,h-34],[w-34,h-34]].forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 7, 0, 6.2832); g.fill(); });
  g.fillStyle = "#E6E9EB"; g.font = "800 52px 'Bricolage Grotesque', Arial, sans-serif";
  g.fillText("MOHAMAD ALI CHOUMAR", 66, 130);
  g.fillStyle = "#C0714A"; g.font = "500 20px 'IBM Plex Mono', monospace";
  g.fillText("SOFTWARE ENGINEERING · ESSEN", 66, 168);
  g.fillStyle = "#8A9196"; g.font = "400 22px 'IBM Plex Mono', monospace";
  [mail(), "choumar.is-a.dev", "github.com/MAliChoumar", "Deutsch C1 · English A2 · Arabic native"]
    .forEach(function (t, i) { g.fillText(t, 66, 260 + i * 42); });
  g.fillStyle = "#E8EAEB"; g.fillRect(w - 320, h - 320, 254, 254);
  try { g.drawImage(qrSrc, w - 308, h - 308, 230, 230); } catch (e) {}
  g.fillStyle = "#5A6469"; g.font = "400 15px 'IBM Plex Mono', monospace";
  g.fillText("WERK //", 66, h - 60);
  try { $("#dlKarte").href = k.toDataURL("image/png"); } catch (e) {}
}
buildQrTabs();

(function loadQr() {
  var s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  s.onload = makeQr;
  s.onerror = function () { $("#qrNote").textContent = lang === "de" ? "QR-Code nicht verfügbar — Kontaktdaten stehen unten." : "QR code unavailable — contact details are below."; };
  document.head.appendChild(s);
})();

/* ══ CONTACT FORM ═══════════════════════════════════════════════ */

/* The relay that turns a submitted form into an e-mail in his inbox.
   Assembled from mail() rather than written out, so the address is not
   sitting in the source for scrapers. If the relay is ever unreachable
   the form falls back to a pre-filled draft instead of dead-ending. */
function endpoint() { return "https://formsubmit.co/ajax/" + mail(); }
var form = $("#contactForm"), fmsg = $("#formMsg");

function ref() {
  var d = new Date();
  return "AUF-" + String(d.getDate()).padStart(2, "0") + String(d.getMonth() + 1).padStart(2, "0") + "-" +
         String(Math.floor(Math.random() * 9000) + 1000);
}
function mailtoFallback(name, email, topic, msg, r) {
  var body = (lang === "de" ? "Von: " : "From: ") + name + " <" + email + ">\n" +
             (lang === "de" ? "Thema: " : "Topic: ") + topic + "\nRef: " + r + "\n\n" + msg;
  return "mailto:" + mail() + "?subject=" + encodeURIComponent("[" + topic + "] " + name) + "&body=" + encodeURIComponent(body);
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var u = UI[lang];
  var name = $("#fName").value.trim(), email = $("#fMail").value.trim(), msg = $("#fMsg").value.trim();
  var topic = ($(".topic[aria-pressed='true']") || {}).textContent || TOPICS[lang][0];
  if ($("#fHp").value) return;
  fmsg.removeAttribute("data-state"); fmsg.textContent = "";
  if (!name || !email || !msg) { fmsg.dataset.state = "err"; fmsg.textContent = u.fill; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { fmsg.dataset.state = "err"; fmsg.textContent = u.badmail; return; }

  var r = ref();
  $("#formRef").textContent = r;
  fmsg.textContent = u.sending;

  var done = function () {
    form.querySelector(".eingang") && form.querySelector(".eingang").remove();
    fmsg.textContent = "";
    var box = el("div", "eingang", "<b>" + u.okTitle + "</b>" + esc(r) + "<small>" + esc(u.okSub) + "</small>");
    form.appendChild(box);
    form.reset(); renderTopics();
  };
  var fail = function () {
    fmsg.dataset.state = "err";
    fmsg.innerHTML = esc(u.errH) + " " + esc(u.errP) + ' <a href="' + mailtoFallback(name, email, topic, msg, r) + '">' + esc(mail()) + "</a>.";
  };

  fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name, email: email, topic: topic, message: msg, ref: r, lang: lang,
      _subject: "[" + topic + "] " + name + " · " + r,
      _template: "table",
      _captcha: "false"
    })
  }).then(function (res) {
    /* A 200 alone is not proof the mail left: the relay answers 200 while an
       address is still awaiting confirmation. Only success:"true" counts, so
       the visitor is never told "sent" when nothing was. */
    return res.json().then(function (d) { String(d.success) === "true" ? done() : fail(); });
  }).catch(fail);
});


/* ══ LIVING BACKGROUND FIELD ════════════════════════════════════
   The connected-line field he liked, rebuilt in copper and patina.
   Canvas 2D — no Three.js, no Vanta, a fraction of the weight.
   ════════════════════════════════════════════════════════════════ */
(function bgfx() {
  var c = $("#bgfx"); if (!c) return;
  var g = c.getContext("2d", { alpha: true });
  var pts = [], w = 0, h = 0, dpr = 1;
  var mx = -9999, my = -9999;
  var LINK = 148, LINK2 = LINK * LINK;

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    var target = COARSE ? Math.round(w * h / 32000) : Math.round(w * h / 15000);
    target = Math.max(22, Math.min(target, 110));
    pts = [];
    for (var i = 0; i < target; i++) {
      pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16,
        r: Math.random() < .16 ? 2.1 : 1.2,
        c: Math.random() < .22 ? "78,140,125" : "192,113,74"
      });
    }
  }

  if (!COARSE) {
    addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    addEventListener("pointerleave", function () { mx = my = -9999; }, { passive: true });
  }

  function frame() {
    g.clearRect(0, 0, w, h);
    var i, j, a, b, dx, dy, d2, alpha;

    for (i = 0; i < pts.length; i++) {
      a = pts[i];
      if (!STILL) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = w + 20; if (a.x > w + 20) a.x = -20;
        if (a.y < -20) a.y = h + 20; if (a.y > h + 20) a.y = -20;
        // gentle pull toward the pointer — the field notices you
        dx = mx - a.x; dy = my - a.y; d2 = dx * dx + dy * dy;
        if (d2 < 46000 && d2 > 1) { a.x += dx / d2 * 26; a.y += dy / d2 * 26; }
      }
    }

    for (i = 0; i < pts.length; i++) {
      a = pts[i];
      for (j = i + 1; j < pts.length; j++) {
        b = pts[j];
        dx = a.x - b.x; dy = a.y - b.y; d2 = dx * dx + dy * dy;
        if (d2 > LINK2) continue;
        alpha = (1 - d2 / LINK2);
        var midx = (a.x + b.x) / 2, midy = (a.y + b.y) / 2;
        var pd = Math.sqrt((mx - midx) * (mx - midx) + (my - midy) * (my - midy));
        var hot = pd < 190 ? (1 - pd / 190) : 0;
        g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y);
        g.strokeStyle = "rgba(" + (hot > .1 ? "192,113,74," + (alpha * (.16 + hot * .55)) : "90,100,105," + alpha * .13) + ")";
        g.lineWidth = hot > .35 ? 1.15 : .8;
        g.stroke();
      }
      var pdn = Math.sqrt((mx - a.x) * (mx - a.x) + (my - a.y) * (my - a.y));
      var glow = pdn < 200 ? (1 - pdn / 200) : 0;
      g.beginPath(); g.arc(a.x, a.y, a.r + glow * 1.6, 0, 6.2832);
      g.fillStyle = "rgba(" + a.c + "," + (.22 + glow * .68) + ")";
      g.fill();
      if (glow > .45) {
        g.beginPath(); g.arc(a.x, a.y, (a.r + 5) * glow, 0, 6.2832);
        g.fillStyle = "rgba(" + a.c + "," + (glow * .13) + ")"; g.fill();
      }
    }
    requestAnimationFrame(frame);
  }

  addEventListener("resize", size, { passive: true });
  size();
  requestAnimationFrame(frame);
})();

/* ══ WHOAMI TERMINAL ════════════════════════════════════════════ */
var TERM = {
  de: [
    ["cmd", "whoami"],
    ["out", "mohamad-ali — Software-Engineering-Student @ Uni Duisburg-Essen"],
    ["gap", ""],
    ["cmd", "cat fokus.txt"],
    ["out", "Systeme bauen, die jemand wirklich benutzt."],
    ["gap", ""],
    ["cmd", "ls production/"],
    ["lnk", "milano-pizzeria-duisburg.dev"], ["ok", "  ✓ live · echte Gäste · echte Reservierungen"],
    ["gap", ""],
    ["cmd", "git log --oneline choumaros | wc -l"],
    ["out", "87"],
    ["gap", ""],
    ["cmd", "./ship --check"],
    ["ok", "format ✓   lint ✓   typecheck ✓   test ✓   e2e ✓   build ✓"],
    ["gap", ""],
    ["cmd", "cat lernen.txt"],
    ["out", "Werkzeuge wechseln. Präzise spezifizieren und prüfen bleibt."],
    ["gap", ""],
    ["cmd", "status"],
    ["warn", "verfügbar — Werkstudent / Praktikum · Ruhrgebiet"]
  ],
  en: [
    ["cmd", "whoami"],
    ["out", "mohamad-ali — software engineering student @ University of Duisburg-Essen"],
    ["gap", ""],
    ["cmd", "cat focus.txt"],
    ["out", "Build systems somebody actually uses."],
    ["gap", ""],
    ["cmd", "ls production/"],
    ["lnk", "milano-pizzeria-duisburg.dev"], ["ok", "  ✓ live · real guests · real reservations"],
    ["gap", ""],
    ["cmd", "git log --oneline choumaros | wc -l"],
    ["out", "87"],
    ["gap", ""],
    ["cmd", "./ship --check"],
    ["ok", "format ✓   lint ✓   typecheck ✓   test ✓   e2e ✓   build ✓"],
    ["gap", ""],
    ["cmd", "cat learning.txt"],
    ["out", "Tools change. Specifying precisely and verifying does not."],
    ["gap", ""],
    ["cmd", "status"],
    ["warn", "available — working student / internship · Ruhr area"]
  ]
};

var termTimer = null, termRan = false;
function runTerm() {
  var body = $("#termBody"), shell = $("#termShell");
  if (!body) return;
  clearTimeout(termTimer);
  body.innerHTML = "";
  shell.classList.add("live");
  var lines = TERM[lang], li = 0, ci = 0, cur = null;

  if (STILL) {
    lines.forEach(function (l) {
      if (l[0] === "gap") { body.appendChild(document.createElement("br")); return; }
      var d = el("div", l[0]); d.textContent = l[1]; body.appendChild(d);
    });
    return;
  }
  var caret = el("span", "caret");
  (function step() {
    if (li >= lines.length) { body.appendChild(caret); return; }
    var l = lines[li];
    if (l[0] === "gap") { body.appendChild(document.createElement("br")); li++; return (termTimer = setTimeout(step, 130)); }
    if (!cur) { cur = el("div", l[0]); body.appendChild(cur); body.appendChild(caret); ci = 0; }
    cur.textContent = l[1].slice(0, ++ci);
    body.appendChild(caret);
    if (ci >= l[1].length) { cur = null; li++; return (termTimer = setTimeout(step, l[0] === "cmd" ? 260 : 150)); }
    termTimer = setTimeout(step, l[0] === "cmd" ? 34 : 12);
  })();
}

/* ══ BOOT ═══════════════════════════════════════════════════════ */

$$("section.section").forEach(function (sec, i) {
  sec.style.setProperty("--pool", (i % 2 ? 16 + (i * 7) % 26 : 74 + (i * 5) % 20) + "%");
});
$("#year").textContent = String(new Date().getFullYear());
applyLang();
sizeCanvas();
requestAnimationFrame(drawSchema);
onScroll();
setTimeout(function () { renderEvents(); onScroll(); }, 400);

})();
