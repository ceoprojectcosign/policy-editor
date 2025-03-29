import request from 'supertest';
import app from '../server.js';

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


// File: backend/server.js (update at end of file)
// ... existing express app setup
export default app;
