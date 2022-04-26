/*
    const request = require('supertest');
    const {Genre}=require('../../models/genre');
    const {User}=require('../../models/user');

    describe('/api/genres',()=>{
    let server;
    beforeEach(()=>{server=require('../../index');});
    afterEach(async()=>{
    await server.close();
    await Genre.remove({});
    });

    describe('GET/',()=>{
    it('get all genres', async ()=>{
    await Genre.collection.insertMany([
    {name:"Genre1"},
    {name:'Genre2'}
    ]);

    const res = await request(server).get('/api/genres');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    //to remove the collection each time we call
    expect(res.body.some(g=>g.name==='Genre1')).toBeTruthy();
    expect(res.body.some(g=>g.name==='Genre2')).toBeTruthy();
    });
    });

    describe('GET/id',()=>{
    it('Return the Genre with valid id',async()=>{
    const genre = new Genre({name:'Genre1'});
    await genre.save();
    const res = await request(server).get('/api/genres/'+genre._id);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name',genre.name);
    });

    it('Return the Genre if the id is valid',async()=>{
    const res = await request(server).get('/api/genres/1');
    expect(res.status).toBe(404);
    });
    });

    describe('POST/',()=>{
    let token;
    let name;
    const exec = async ()=>{
    return await request(server)
    .post('/api/genres')
    .set('x-auth-token',token)
    .send({name});
    }
    beforeEach(()=>{
    token = new User().generateAuthToken();
    name= 'genre';
    });

    it('Shoudl return 401 if the client is not logged in',async()=>{
    token='';
    const res = await exec();
    expect(res.status).toBe(401);
    });

    it('Shoudl return 400 if the genre is less than 5 charachters',async()=>{
    name='1234'
    const res = await exec();
    expect(res.status).toBe(400);
    });

    it('Shoudl return 400 if the genre is more than 50 charachters',async()=>{
    name = new Array(52).join('n');
    const res = await exec();
    expect(res.status).toBe(400);
    });
    it('Shoudl save the genre if it is valid',async()=>{
    await exec();
    const genre = await Genre.find({name:'genre'})
    expect(genre).not.toBeNull();
    });

    it('Shoudl return the genre if it is valid',async()=>{
    const req = await exec();
    expect(req.body).toHaveProperty('_id');
    expect(req.body).toHaveProperty('name','genre');
    });

    });

    }); //first describe suite
*/