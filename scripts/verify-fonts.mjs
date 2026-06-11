// 字体 URL 验证脚本
// 用途: 对 fonts.ts 中每个 source URL 执行 HTTP 请求, 验证其是否真正可用
// 用法: node scripts/verify-fonts.mjs [--json output.json]
//
// 输出: 每个字体的所有 source URL 的 HTTP 状态码, Content-Type, 是否有效

import fs from 'node:fs';
import path from 'node:path';

const FONTS_FILE = '/workspace/src/data/fonts.ts';
const ARGS = process.argv.slice(2);
const JSON_OUT = ARGS.includes('--json') ? ARGS[ARGS.indexOf('--json') + 1] : null;
const CONCURRENCY = 16;
const TIMEOUT = 12000;
const REPORT_PATH = JSON_OUT || '/workspace/font_validation/verify_report.txt';

// ====== 解析 fonts.ts (轻量级正则提取) ======
function parseFonts(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8');
  // 找到 "export const FONTS" 位置
  const exportIdx = src.indexOf('export const FONTS');
  if (exportIdx === -1) throw new Error('未找到 FONTS 数组');
  // 找到 = 后的第一个 [
  const eqIdx = src.indexOf('=', exportIdx);
  const startIdx = src.indexOf('[', eqIdx);
  if (startIdx === -1) throw new Error('未找到 FONTS 数组开始');
  // 找到对应的结束 ]
  let arrDepth = 0;
  let inString = null;
  let escaped = false;
  let endIdx = -1;
  for (let i = startIdx; i < src.length; i++) {
    const ch = src[i];
    if (inString) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inString = ch; continue; }
    if (ch === '[') {
      arrDepth++;
    } else if (ch === ']') {
      arrDepth--;
      if (arrDepth === 0) { endIdx = i; break; }
    }
  }
  if (endIdx === -1) throw new Error('未找到 FONTS 结束');
  const arr = src.slice(startIdx, endIdx + 1);

  // 简化: 提取每个 { ... } 块
  const fonts = [];
  let braceDepth = 0;
  let inStr = null;
  let esc = false;
  let currentStart = -1;
  for (let i = 0; i < arr.length; i++) {
    const ch = arr[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
    if (ch === '{') {
      if (braceDepth === 0) currentStart = i + 1;
      braceDepth++;
    } else if (ch === '}') {
      braceDepth--;
      if (braceDepth === 0 && currentStart !== -1) {
        const block = arr.slice(currentStart, i);
        fonts.push(parseBlock(block));
        currentStart = -1;
      }
    }
  }
  return fonts;
}

function parseBlock(block) {
  const name = matchStr(block, 'name');
  const family = matchStr(block, 'family');
  const category = matchStr(block, 'category');
  const sources = matchSources(block);
  return { name, family, category, sources };
}

function matchStr(block, key) {
  const re = new RegExp(`\\b${key}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1).)*?)\\1`, 's');
  const m = re.exec(block);
  return m ? m[2] : '';
}

function matchSources(block) {
  const re = /sources\s*:\s*\[([\s\S]*?)\]/;
  const m = re.exec(block);
  if (!m) return [];
  const inner = m[1];
  const out = [];
  const re2 = /\{\s*type\s*:\s*['"](\w[\w-]*)['"]\s*,\s*url\s*:\s*(['"])((?:\\\\.|(?!\\2).)*?)\2/g;
  let mm;
  while ((mm = re2.exec(inner)) !== null) {
    out.push({ type: mm[1], url: mm[3] });
  }
  return out;
}

// ====== HTTP 验证 ======
async function checkUrl(url) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT),
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' },
    });
    const elapsed = Date.now() - start;
    const ct = res.headers.get('content-type') || '';
    const text = ct.includes('text') || ct.includes('css') || ct.includes('json') || ct.includes('xml');
    let body = '';
    let validCss = false;
    if (text && res.status < 400) {
      body = (await res.text()).slice(0, 4096);
      validCss = /@font-face/i.test(body);
    }
    let validFont = false;
    if (!text && res.status < 400) {
      const ab = await res.arrayBuffer();
      const head = new Uint8Array(ab.slice(0, 4));
      const hex = Array.from(head).map(b => b.toString(16).padStart(2, '0')).join('');
      // woff: 774F4632, woff2: 774F4632 (sniffed by browser, raw also), ttf: 00010000, otf: 4F54544F
      validFont = ab.byteLength > 100 && (
        hex.startsWith('774f4632') || // woff/woff2
        hex.startsWith('00010000') || // ttf
        hex.startsWith('4f54544f')    // OTF
      );
    }
    return {
      url,
      status: res.status,
      ok: res.ok,
      contentType: ct,
      isCss: text,
      isFont: !text,
      validCss,
      validFont,
      elapsed,
    };
  } catch (e) {
    return {
      url,
      status: 0,
      ok: false,
      contentType: '',
      isCss: false,
      isFont: false,
      validCss: false,
      validFont: false,
      elapsed: Date.now() - start,
      error: e.message,
    };
  }
}

async function runConcurrent(items, worker, concurrency) {
  const results = new Array(items.length);
  let idx = 0;
  async function workerFn() {
    while (true) {
      const i = idx++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, workerFn);
  await Promise.all(workers);
  return results;
}

// ====== 主流程 ======
async function main() {
  console.log('解析 fonts.ts...');
  const fonts = parseFonts(FONTS_FILE);
  console.log(`找到 ${fonts.length} 个字体条目`);

  // 展开所有 URL
  const allUrls = [];
  for (const f of fonts) {
    for (const s of f.sources) {
      allUrls.push({ font: f.name, type: s.type, url: s.url });
    }
  }
  console.log(`总 URL 数: ${allUrls.length}`);

  // 并发验证
  console.log('开始验证...');
  const results = await runConcurrent(allUrls, async (item) => {
    const r = await checkUrl(item.url);
    return { ...item, ...r };
  }, CONCURRENCY);

  // 汇总
  let validCount = 0;
  let invalidCount = 0;
  const fontValidUrls = new Map(); // name -> count of valid URLs
  for (const r of results) {
    const isValid = (r.isCss && r.validCss) || (r.isFont && r.validFont);
    if (isValid) validCount++; else invalidCount++;
    if (!fontValidUrls.has(r.font)) fontValidUrls.set(r.font, 0);
    if (isValid) fontValidUrls.set(r.font, fontValidUrls.get(r.font) + 1);
  }

  console.log(`\n=== 验证结果 ===`);
  console.log(`  有效 URL: ${validCount}`);
  console.log(`  无效 URL: ${invalidCount}`);
  console.log(`  无可用 source 的字体: ${[...fontValidUrls.entries()].filter(([_, c]) => c === 0).length}`);

  // 写报告
  const lines = [];
  lines.push(`字体 URL 验证报告 - ${new Date().toISOString()}`);
  lines.push(`总字体: ${fonts.length}, 总 URL: ${allUrls.length}, 有效: ${validCount}, 无效: ${invalidCount}`);
  lines.push('');
  for (const f of fonts) {
    const fontResults = results.filter(r => r.font === f.name);
    const valid = fontResults.filter(r => (r.isCss && r.validCss) || (r.isFont && r.validFont));
    const status = valid.length > 0 ? 'OK' : 'DEAD';
    lines.push(`[${status}] ${f.name} (${f.category}) - ${valid.length}/${fontResults.length} valid`);
    for (const r of fontResults) {
      const isValid = (r.isCss && r.validCss) || (r.isFont && r.validFont);
      lines.push(`    ${isValid ? '✓' : '✗'} [${r.status}] ${r.contentType || r.error || ''} ${r.url}`);
    }
  }
  fs.writeFileSync(REPORT_PATH, lines.join('\n'));
  console.log(`报告已保存: ${REPORT_PATH}`);

  // 写 JSON
  if (JSON_OUT) {
    fs.writeFileSync(JSON_OUT, JSON.stringify({
      totalFonts: fonts.length,
      totalUrls: allUrls.length,
      validUrls: validCount,
      invalidUrls: invalidCount,
      results,
    }, null, 2));
  }

  // 输出死链字体
  const deadFonts = [...fontValidUrls.entries()].filter(([_, c]) => c === 0).map(([n]) => n);
  console.log(`\n=== 死链字体 (所有 source 都失败) ===`);
  for (const n of deadFonts) console.log(`  - ${n}`);
  console.log(`共 ${deadFonts.length} 个`);
}

main().catch((e) => { console.error(e); process.exit(1); });
