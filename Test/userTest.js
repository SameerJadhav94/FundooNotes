const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
chai.use(chaiHttp);
chai.should();
const faker = require('faker');

const Data = require('./note.userInput.json');
const { it } = require('mocha');


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
describe('forgot password', function () {
    it('should give status 200 when forgot password is called', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    it('should give status 400 when email does not get validated', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'coder 123@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(400);
                    return done();
                }

            })
    })
    it('should validate the email when given given proper input', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    it('should give status 200 when returning a valid email callback from service', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    it('should give status 400 when returning a invalid email callback from service', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'coder 123@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(400);
                    return done();
                }

            })
    })
    it('should give status 200 when returning a valid email callback from model', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    it('should give status 200 when checking if the email exist in the database', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    it('should give status 400 when email does not exist in the database', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer190994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(400);
                    return done();
                }

            })
    })
    it('should give status 200 when email has been sent', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    it('should give status 400 when email has not been sent', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameer190994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(400);
                    return done();
                }

            })
    })
    it('should give status 200 when otp with email has been sent and is been saved into the database', (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send({"email": 'sameerjadhav0994@gmail.com'})
            .end((err, res) => {
                if (err) {
                    return done();
                } else {
                    res.should.have.status(200);
                    return done();
                }

            })
    })
    
})
describe("Reset Password", function () {
    it.only("should return status 200 when reset password api is called", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameerjadhav123',
            code: "MIIcE"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
    it.only("should return status 400 when password does not gets validated", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'sameer1994',
            code: "MIIcE"
        })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
    it.only("should return status 200 when password gets validated", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameer1994',
            code: "MIIcE"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
    it.only("should return status 200 when gets callback from service", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameer1994',
            code: "MIIcE"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
    it.only("should return status 400 when gets invalid callback from service", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameer1994',
            code: "Qi3Pg"
        })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
    it.only("should return status 200 when gets callback from model", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameer1994',
            code: "MIIcE"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
    it.only("should return status 200 when Otp maches with database", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameer1994',
            code: "MIIcE"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
    it.only("should return status 400 when Otp does not maches with database", (done) => {
        chai.request(server)
        .patch('/resetPassword')
        .send({
            email: "sameerjadhav0994@gmail.com",
            password: 'Sameer1994',
            code: "MIIcl"
        })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
    
})