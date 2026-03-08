#!/usr/bin/env node
/**
 * Smoke test for Agent Skills API (search, t, audit).
 * Usage: BASE_URL=https://agentskillsforall.com node scripts/test-api.mjs
 */
const BASE = process.env.BASE_URL || "https://agentskillsforall.com";

async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
    return true;
  } catch (e) {
    console.error(`❌ ${name}:`, e.message);
    return false;
  }
}

async function main() {
  console.log(`Testing API at ${BASE}\n`);

  let ok = 0;

  await test("GET /api/search", async () => {
    const r = await fetch(`${BASE}/api/search?q=playwright&limit=5`);
    if (!r.ok) throw new Error(`status ${r.status}`);
    const j = await r.json();
    if (!Array.isArray(j.skills)) throw new Error("missing skills array");
  });
  ok++;

  await test("GET /api/audit", async () => {
    const r = await fetch(`${BASE}/api/audit`);
    if (!r.ok) throw new Error(`status ${r.status}`);
    const j = await r.json();
    if (typeof j !== "object") throw new Error("expected object");
  });
  ok++;

  await test("GET /api/t (telemetry)", async () => {
    const r = await fetch(
      `${BASE}/api/t?event=install&source=github.com/test/repo&skills=playwright-skill`
    );
    if (r.status !== 204) throw new Error(`expected 204, got ${r.status}`);
  });
  ok++;

  console.log("\nDone.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
