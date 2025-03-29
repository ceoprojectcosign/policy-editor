import { execSync } from 'child_process';

console.log('🧪 Running FULL PROJECT TEST SUITE...');

try {
  console.log('\n🧪 [FRONTEND] Running Vitest unit tests...');
  execSync('npx vitest run', { cwd: './frontend', stdio: 'inherit' });

  console.log('\n🧪 [FRONTEND] Running Playwright E2E tests...');
  execSync('npx playwright test', { cwd: './frontend', stdio: 'inherit' });

  console.log('\n🧪 [BACKEND] Running Jest tests...');
  execSync('node --experimental-vm-modules node_modules/jest/bin/jest.js', {
    cwd: './backend',
    stdio: 'inherit'
  });

  console.log('\n✅ All tests passed successfully!');
} catch (err) {
  console.error('\n❌ Test suite failed. Check the logs above for details.');
  process.exit(1);
}