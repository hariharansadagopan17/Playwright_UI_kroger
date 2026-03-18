#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📊 Generating Test Reports...\n');

// Check if cucumber report JSON exists
const reportJsonPath = 'cucumber-report.json';
const reportHtmlPath = 'cucumber-report.html';

if (fs.existsSync(reportJsonPath)) {
  console.log('✅ Cucumber JSON Report found: cucumber-report.json');
  console.log('   Location:', path.resolve(reportJsonPath));
} else {
  console.log('⚠️  No Cucumber JSON report found. Run tests first: npm run test:bdd');
}

if (fs.existsSync(reportHtmlPath)) {
  console.log('✅ Cucumber HTML Report found: cucumber-report.html');
  console.log('   Location:', path.resolve(reportHtmlPath));
  console.log('   Open in browser to view: file://' + path.resolve(reportHtmlPath));
} else {
  console.log('⚠️  No Cucumber HTML report found. Run tests first: npm run test:bdd');
}

// Check Playwright reports
const playwrightReportDir = 'playwright-report';
if (fs.existsSync(playwrightReportDir)) {
  console.log('✅ Playwright HTML Report directory found: playwright-report');
  console.log('   Open in browser with: npx playwright show-report');
} else {
  console.log('⚠️  No Playwright report directory found. Run tests first: npm run test');
}

// Check test results
const testResultsDir = 'test-results';
if (fs.existsSync(testResultsDir)) {
  const files = fs.readdirSync(testResultsDir);
  if (files.length > 0) {
    console.log('✅ Test results found in:', testResultsDir);
    files.forEach(file => {
      const filePath = path.join(testResultsDir, file);
      const stat = fs.statSync(filePath);
      console.log(`   - ${file} (${stat.size} bytes)`);
    });
  }
}

console.log('\n📋 Report Summary:');
console.log('─────────────────────────────────────');
console.log('1. Cucumber HTML Report: cucumber-report.html (open in browser)');
console.log('2. Cucumber JSON Report: cucumber-report.json (machine-readable)');
console.log('3. Playwright HTML Report: npx playwright show-report');
console.log('4. Test Results: test-results/ directory');
console.log('\n💡 Tip: Use "npm run report" to regenerate this summary anytime!');
