/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
const faker = require('faker');

const { it } = require('mocha');
const server = require('../server');

const Data = require('./note.userInput.json');

// Test cases for Registration
describe('registration API', () => {
  it('given registration details if proper then save in DB', (done) => {
    const fakeUserDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    chai.request(server)
      .post('/register')
      .send(fakeUserDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        res.should.have.status(200);
        done();
      });
  });
  it('given registration details, if without email, should not save in database', (done) => {
    const userDetails = Data.testData.withoutEmail;
    chai.request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        done();
      });
  });

  it('given registration details, if without first name should not save in database', (done) => {
    const userDetails = Data.testData.withoutFirstName;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it('given registration details, if without last name should not save in database', (done) => {
    const userDetails = Data.testData.withoutLastName;

    chai.request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        res.should.have.status(400);
        done();
      });
  });

  it('given registration details, if improper should not save in database', (done) => {
    const userDetails = Data.testData.improper;

    chai.request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe('Login', () => {
  it('given Login details if true should log in ', (done) => {
    const userDetails = Data.testData.correctLogin;

    chai.request(server)
      .post('/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });

  it('given Login details if improper should not log in ', (done) => {
    const userDetails = Data.testData.incorrectLogin;

    chai.request(server)
      .post('/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
});
// eslint-disable-next-line no-undef
describe('forgot password', () => {
  it('should give status 200 when forgot password is called', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('should give status 400 when email does not get validated', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'coder 123@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it('should validate the email when given given proper input', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('should give status 200 when returning a valid email callback from service', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('should give status 400 when returning a invalid email callback from service', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'coder 123@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it('should give status 200 when returning a valid email callback from model', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('should give status 200 when checking if the email exist in the database', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('should give status 400 when email does not exist in the database', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer190994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it('should give status 200 when email has been sent', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('should give status 400 when email has not been sent', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameer190994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it('should give status 200 when otp with email has been sent and is been saved into the database', (done) => {
    chai.request(server)
      .post('/forgotPassword')
      .send({ email: 'sameerjadhav0994@gmail.com' })
      .end((err, res) => {
        if (err) {
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
});
// eslint-disable-next-line no-undef
describe('Reset Password', () => {
  it('should return status 200 when reset password api is called', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameerjadhav123',
        code: 'MIIcE',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when password does not gets validated', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'sameer1994',
        code: 'MIIcE',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when password gets validated', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameer1994',
        code: 'MIIcE',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 200 when gets callback from service', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameer1994',
        code: 'MIIcE',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when gets invalid callback from service', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameer1994',
        code: 'Qi3Pg',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when gets callback from model', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameer1994',
        code: 'MIIcE',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 200 when Otp maches with database', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameer1994',
        code: 'MIIcE',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when Otp does not maches with database', (done) => {
    chai.request(server)
      .patch('/resetPassword')
      .send({
        email: 'sameerjadhav0994@gmail.com',
        password: 'Sameer1994',
        code: 'MIIcl',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
// Test cases for Create note
// eslint-disable-next-line no-undef
describe('Create note', () => {
  it('should return status response 200 when create note is called', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const fakeNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
    };
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(fakeNote)
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it('should return status response 200 when token gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const fakeNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
    };
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(fakeNote)
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it('should return status response 400 when token does not gets validated', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send({ tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status response 200 when note gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const fakeNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
    };
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(fakeNote)
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it('should return status response 400 when note title does not gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const noteCheck = Data.testData.invalidNote;
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(noteCheck)
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status response 400 when note description does not gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const noteCheck = Data.testData.invalidNote;
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(noteCheck)
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status response 200 when gets callback from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const fakeNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
    };
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(fakeNote)
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it('should return status response 400 when get invalid callback from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const noteCheck = Data.testData.invalidNote;
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(noteCheck)
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status response 201 when gets callback from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const fakeNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
    };
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(fakeNote)
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it('should return status response 400 when get invalid callback from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const noteCheck = Data.testData.invalidNote;
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(noteCheck)
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status response 201 when note gets created', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const fakeNote = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
    };
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(fakeNote)
      .end((err, res) => {
        res.should.have.status(201);
        return done();
      });
  });
  it('should return status response 400 when note does not gets created', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const noteCheck = Data.testData.invalidNote;
    chai.request(server)
      .post('/createNote')
      .set({ authorization: tokenCheck })
      .send(noteCheck)
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
});

describe('Get Note', () => {
  it('should return status 200 when get Note API is called', ((done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .send({ tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  }));
  it('should return status 200 when token gets validated', ((done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .send({ tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  }));
  it('should return status 200 when id gets validated', ((done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .send('61c526d03a2f81b7cfa32a9a')
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  }));
  it('should return status 200 if id gets authenticated, when getting callback from service', ((done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  }));
  it('should return status 400 if id does not gets authenticated, when getting callback from service', ((done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  }));
  it('should return status 200 if id gets authenticated, when getting callback from model', ((done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  }));
  it('should return status 400 if id does not gets authenticated, when getting invalid callback from model', ((done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  }));
  it('should return status 200 if id gets checked and matched with the database', ((done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  }));
  it('should return status 400 if id gets checked and does not matched with the database', ((done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .get('/getNote')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  }));
});

describe('Get Note By Id', () => {
  it('should return status 200 when get node by id is called', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('should return status 200 when token gets authenticated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('should return status 400 when id gets validated for unAuthenticated Token token', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status 200 when id gets validated for Authenticated  token', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('should return status 200 when gets valid callback from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('should return status 400 when gets invalid callback from service', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status 200 when gets valid callback from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('should return status 400 when gets invalid callback from model', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .get('/getNoteById/61cc51114e7834bcfb612e15')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('should return status 200 when gets valid callback from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .get('/getNoteById/61ccefce5990a8fbc4560c94')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
});

describe('Update Note By Id', () => {
  it('should return status 200 when Update Note API is called', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when token is not authenticated', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .put('/updateNoteById/:id')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when token is authenticated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 200 when title and description gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.note;
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when description does not gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.invalidNote;
    chai.request(server)
      .put('/updateNoteById/:id')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 400 when title does not gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.invalidNote;
    chai.request(server)
      .put('/updateNoteById/:id')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when gets valid callback from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.note;
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when gets invalid callback from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.invalidNote;
    chai.request(server)
      .put('/updateNoteById/:id')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when gets valid callback from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.note;
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when does not gets valid callback from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = Data.testData.invalidNote;
    chai.request(server)
      .put('/updateNoteById/:id')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when note gets updated in DB', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = {
      title: 'Refactor',
      description: 'Updating Note',
    };
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when given invalid input should not gets updated in DB', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    const mynote = {
      title: 'R',
      description: 'Updating Note',
    };
    chai.request(server)
      .put('/updateNoteById/61ccefce5990a8fbc4560c95')
      .set({ authorization: tokenCheck })
      .send(mynote)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe('Delete Note By Id', () => {
  it('should return status 200 when delete note api is called', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61d2501310ad80144b3689e5')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when token does not get authenticated', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .delete('/deleteNoteById/:id')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when input gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61d2501310ad80144b3689e2')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when input does not gets validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61ce68fb3d2bc7aa00')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when gets valid response from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61d2501310ad80144b3689df')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when does not gets valid response from service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61ce68fb3d2bc7aa00')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when gets valid response from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61d2501310ad80144b3689dc')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when does not gets valid response from model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61ce68fb3d2bc7aa00')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return status 200 when note gets deleted successfully from the DB', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61d2501310ad80144b3689d9')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return status 400 when note does not gets deleted from the DB', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .delete('/deleteNoteById/61cbeaf9cbbae822ef133e9d')
      .set({ authorization: tokenCheck })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe('Add Label', () => {
  it('Should Return Response 200 When Add Label API Is Called', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d11891b0b8d418f77db61a')
      .set({ authorization: tokenCheck })
      .send({label: faker.lorem.word()})
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('Should Return Response 400 When Token Not Gets Authenticated', (done) => {
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('Should Return Response 200 When Label gets Validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: faker.lorem.word()})
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('Should Return Response 400 When Label Does Not Gets Validated', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: 'A'})
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('Should Return Response 200 When Gets Valid Response From Service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: faker.lorem.word()})
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('Should Return Response 400 When Does Not Gets Valid Response From Service', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: 'A'})
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('Should Return Response 200 When Gets Valid Response From Model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: faker.lorem.word()})
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('Should Return Response 400 When Does Not Gets Valid Response From Model', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: 'A'})
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it('Should Return Response 200 When Label Gets Saved Into DB', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: faker.lorem.word()})
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it('Should Return Response 400 When Label Does Not Get Created', (done) => {
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
      .post('/addLabel/61d135f786d86f57e66b92aa')
      .set({ authorization: tokenCheck })
      .send({label: "libero"})
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
});

describe('Get Label', () => {
  it("Should return Response 200 when Get Label API is called", (done) =>{
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
  it("Should return Response 400 when token does not get authenticated", (done) =>{
    const tokenCheck = Data.testData.token.unAuthToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  })
  it("Should return Response 200 when token  gets authenticated", (done) =>{
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
  it("Should return Response 200 when id gets validated", (done) =>{
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
  it("Should return Response 200 when gets valid response from service", (done) =>{
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
  it("Should return Response 200 when gets valid response from model", (done) =>{
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
  it("Should return Response 200 when gets labels for note", (done) =>{
    const tokenCheck = Data.testData.token.authToken;
    chai.request(server)
    .get('/getLabel')
    .set({ authorization: tokenCheck })
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
})
describe('Get label by id', () => {
  it.only('should return Response 200 when Get Label By Id API is called',(done)=>{
    chai.request(server)
    .get('/getLabelById/:id')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })
  })
})
