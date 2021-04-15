const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Helena', genre: 'Rock' , price: '40' , day: '1' , image: 'image1' });
    await testConOne.save();
  
    const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Marian', genre: 'Rock' , price: '35' , day: '2' , image: 'image2' });
    await testConTwo.save();

    const testConThree = new Concert({ _id: '5d9f1159f81ce8d1ef255555', performer: 'Halina', genre: 'Jazz' , price: '25' , day: '2' , image: 'image3' });
    await testConThree.save();

    const testConFour = new Concert({ _id: '5d9f1159f81ce8dddd222222', performer: 'Boczek', genre: 'Pop' , price: '15' , day: '1' , image: 'image4' });
    await testConFour.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(4);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return concerts filtered by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Helena');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/genre/:genre should return concerts filtered by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('price/:price_min/:price_max should return concerts filtered by price', async () => {
    const res = await request(server).get('/api/concerts/price/20/45');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('/day/:day should return concerts filtered by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});