const app = require('../api');
const { expect } = require('chai');
const supertest = require('supertest');
// const assert = require('assert');


describe('express app', () => {
  describe('GET /apps', () => {
    it('should return an array of apps as json', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object')
          expect(res.body[0]).to.include.all.keys('App', 'Rating', 'Genres')
        })
    })

    it('should return status 400 if sort is NOT App or Rating', () => {
      return supertest(app)
      .get('/apps')
      .query({ sort : 'MISTAKE' })
      .expect(400)
    })

    it('should be 200 if sort is correct', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: ('App', 'Rating') })
        .expect(200)
    });

    it('should return status 400 if genre is NOT Action, Puzzle, Strategy, Casual, Arcade, or Card', () => {
      return supertest(app)
      .get('/apps')
      .query({ genre : 'MISTAKE' })
      .expect(400)
    })

    it('should return status 200 if genre is Action, Puzzle, Strategy, Casual, Arcade, or Card', () => {
      return supertest(app)
      .get('/apps')
      .query({ genre : ('Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card') })
      .expect(200)
    })

    it('should return filtered apps list', () => {
      return supertest(app)
      .get('/apps')
      .query({ genre : 'Arcade' })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(3);
      })
    })
  })
})

