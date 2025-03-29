const { execSync } = require('child_process');

console.log('🧪 Running FULL PROJECT TEST SUITE...');

try {
  console.log('\n🧪 [FRONTEND] Running Vitest tests...');
  execSync('npx vitest run', { cwd: './frontend', stdio: 'inherit' });

  console.log('\n🧪 [BACKEND] Running Jest API tests...');
  execSync('npm test', { cwd: './backend', stdio: 'inherit' });

  console.log('\n✅ All tests passed successfully!');
} catch (err) {
  console.error('\n❌ Test suite failed. Check the logs above for details.');
  process.exit(1);
}
