import request from 'supertest';
import app from '../server'; 

describe('Apartment API', () => {
  it('should create and fetch an apartment', async () => {
    const newApartment = {
      unitName: 'Test APT',
      unitNumber: '101',
      project: 'Test Project',
      price: 100000,
      bedrooms: 2,
      bathrooms: 1,
      area: 850,
      imageUrl: 'https://example.com/img.jpg',
    };

    // Create apartment
    const res = await request(app)
      .post('/api/apartments')
      .send(newApartment)
      .expect(201);

    // Fetch it
    const getRes = await request(app)
      .get(`/api/apartments/${res.body._id}`)
      .expect(200);

    expect(getRes.body.unitName).toBe('Test APT');
  });
});
