/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Script from '../api/script/script.model';
import Thing from '../api/thing/thing.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {

    Script.find({}).remove()
      .then(() => {
        Script.create({
          scriptName: 'One Errorsss',
          scriptCode: 'import sys' +
                      'if __name__ == "__main__":' +
                  	    'print >> sys.stdout, "Hello, World!"' +
                      	'sys.stdout.flush()' +
                      	'print >> sys.stderr, "FATAL ERROR"' +
                      	'sys.stderr.flush()' +
                      	'sys.exit(1)',
          isWorking: true
        }, {
          scriptName: 'One No Errors',
          scriptCode: 'import sys' +
                      'if __name__ == "__main__":' +
                      	'print >> sys.stdout, "Hello, World!"	' +
                      	'sys.stdout.flush()' +
                      	'sys.exit(0)',
          isWorking: true
        }, {
          scriptName: 'One Empty',
          scriptCode: '',
          isWorking: true
        }, {
          scriptName: 'One akjdfjk',
          scriptCode: 'sdfdsfs',
          isWorking: true
        }, {
          scriptName: 'One hello',
          scriptCode: 'hello',
          isWorking: true
        });
      })
    .then(() => console.log('finished populating scripts'))
    .catch(err => console.log('error populating scripts', err));

    Thing.find({}).remove()
      .then(() => {
        Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

  }
}
