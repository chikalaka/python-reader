'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var scriptCtrlStub = {
  index: 'scriptCtrl.index',
  show: 'scriptCtrl.show',
  create: 'scriptCtrl.create',
  upsert: 'scriptCtrl.upsert',
  patch: 'scriptCtrl.patch',
  destroy: 'scriptCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var scriptIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './script.controller': scriptCtrlStub
});

describe('Script API Router:', function() {
  it('should return an express router instance', function() {
    expect(scriptIndex).to.equal(routerStub);
  });

  describe('GET /api/scripts', function() {
    it('should route to script.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'scriptCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/scripts/:id', function() {
    it('should route to script.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'scriptCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/scripts', function() {
    it('should route to script.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'scriptCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/scripts/:id', function() {
    it('should route to script.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'scriptCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/scripts/:id', function() {
    it('should route to script.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'scriptCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/scripts/:id', function() {
    it('should route to script.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'scriptCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
