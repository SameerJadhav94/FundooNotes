const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
chai.use(chaiHttp);
chai.should();
const faker = require('faker');

const Data = require('./note.userInput.json');

// Test cases for Registration
describe('registration API', () => {

    it('given registration details if proper then save in DB', (done) => {

        const fakeUserDetails = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        chai.request(server)
        .post('/register')
        .send(fakeUserDetails)
        .end((err, res) => {
            if (err) {
                done();
            }
            res.should.have.status(200);
            done();
        })
    })
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
        })
    })

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
        })
    })  

})

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
            done();
        })
    })

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
            done();
        })
    })
}) 