// backend/tests/savePolicy.test.js
const request = require('supertest');
const app = require('../server'); // your Express app

test('save policy endpoint should work', async () => {
  const response = await request(app)
    .post('/api/save-policy')
    .send({
      district: 'demo',
      url: 'http://example.com/policy.pdf',
      text: 'This is test content'
    });

  expect(response.statusCode).toBe(200);
});
