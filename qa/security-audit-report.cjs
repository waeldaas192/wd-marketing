const fs = require('node:fs');

function titleForVia(via) {
  if (typeof via === 'string') return via;
  if (via && typeof via === 'object') return via.title || via.name || via.source || 'advisory';
  return 'advisory';
}

function summariseAudit(audit) {
  const meta = audit?.metadata?.vulnerabilities || {};
  const counts = {
    critical: Number(meta.critical || 0),
    high: Number(meta.high || 0),
    moderate: Number(meta.moderate || 0),
    low: Number(meta.low || 0),
    total: Number(meta.total || 0),
  };
  const severityRank = { critical: 4, high: 3, moderate: 2, low: 1, info: 0 };
  const items = Object.values(audit?.vulnerabilities || {}).map(v => ({
    name: v.name,
    severity: v.severity,
    direct: Boolean(v.isDirect),
    range: v.range || '',
    via: Array.isArray(v.via) ? v.via.map(titleForVia) : [],
    effects: Array.isArray(v.effects) ? v.effects : [],
    nodes: Array.isArray(v.nodes) ? v.nodes : [],
    fixAvailable: v.fixAvailable ?? false,
  })).sort((a,b) => (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0) || a.name.localeCompare(b.name));
  return { counts, items };
}

function render(report) {
  console.log(`npm audit summary: ${report.counts.total} total (${report.counts.critical} critical, ${report.counts.high} high, ${report.counts.moderate} moderate, ${report.counts.low} low)`);
  for (const item of report.items) {
    console.log(`- ${item.severity.toUpperCase()} ${item.name} [${item.direct ? 'direct' : 'transitive'}] range=${item.range || 'n/a'}`);
    if (item.effects.length) console.log(`  affects: ${item.effects.join(', ')}`);
    if (item.via.length) console.log(`  via: ${item.via.join(' | ')}`);
    if (item.nodes.length) console.log(`  nodes: ${item.nodes.join(', ')}`);
    if (item.fixAvailable) console.log(`  fixAvailable: ${typeof item.fixAvailable === 'object' ? JSON.stringify(item.fixAvailable) : String(item.fixAvailable)}`);
  }
}

if (require.main === module) {
  const file = process.argv[2];
  if (!file) throw new Error('Usage: node security-audit-report.cjs <npm-audit.json>');
  render(summariseAudit(JSON.parse(fs.readFileSync(file, 'utf8'))));
}

module.exports = { summariseAudit, render };
