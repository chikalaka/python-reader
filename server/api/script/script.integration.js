'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newScript;

describe('Script API:', function() {
  describe('GET /api/scripts', function() {
    var scripts;

    beforeEach(function(done) {
      request(app)
        .get('/api/scripts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scripts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(scripts).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/scripts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/scripts')
        .send({
          name: 'New Script',
          info: 'This is the brand new script!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newScript = res.body;
          done();
        });
    });

    it('should respond with the newly created script', function() {
      expect(newScript.name).to.equal('New Script');
      expect(newScript.info).to.equal('This is the brand new script!!!');
    });
  });

  describe('GET /api/scripts/:id', function() {
    var script;

    beforeEach(function(done) {
      request(app)
        .get(`/api/scripts/${newScript._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          script = res.body;
          done();
        });
    });

    afterEach(function() {
      script = {};
    });

    it('should respond with the requested script', function() {
      expect(script.name).to.equal('New Script');
      expect(script.info).to.equal('This is the brand new script!!!');
    });
  });

  describe('PUT /api/scripts/:id', function() {
    var updatedScript;

    beforeEach(function(done) {
      request(app)
        .put(`/api/scripts/${newScript._id}`)
        .send({
          name: 'Updated Script',
          info: 'This is the updated script!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedScript = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScript = {};
    });

    it('should respond with the updated script', function() {
      expect(updatedScript.name).to.equal('Updated Script');
      expect(updatedScript.info).to.equal('This is the updated script!!!');
    });

    it('should respond with the updated script on a subsequent GET', function(done) {
      request(app)
        .get(`/api/scripts/${newScript._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let script = res.body;

          expect(script.name).to.equal('Updated Script');
          expect(script.info).to.equal('This is the updated script!!!');

          done();
        });
    });
  });

  describe('PATCH /api/scripts/:id', function() {
    var patchedScript;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/scripts/${newScript._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Script' },
          { op: 'replace', path: '/info', value: 'This is the patched script!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedScript = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedScript = {};
    });

    it('should respond with the patched script', function() {
      expect(patchedScript.name).to.equal('Patched Script');
      expect(patchedScript.info).to.equal('This is the patched script!!!');
    });
  });

  describe('DELETE /api/scripts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/scripts/${newScript._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when script does not exist', function(done) {
      request(app)
        .delete(`/api/scripts/${newScript._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
