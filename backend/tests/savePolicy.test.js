import request from 'supertest';
import app from '../server.js'; // Must include .js extension for ESM

test('save policy endpoint should work', async () => {
  const response = await request(app)
    .post('/api/save-policy')
    .send({
      district: 'TestDistrict',
      url: 'http://example.com/policy.pdf',
      text: 'Example content for test'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
});
