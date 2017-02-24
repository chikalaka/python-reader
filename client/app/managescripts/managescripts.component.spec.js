'use strict';

describe('Component: ManagescriptsComponent', function() {
  // load the controller's module
  beforeEach(module('pythonReaderApp.managescripts'));

  var ManagescriptsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ManagescriptsComponent = $componentController('managescripts', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
