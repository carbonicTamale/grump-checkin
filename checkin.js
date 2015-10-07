var page = require('webpage').create();

var id = 0;

function setup() {
  page.injectJs("jquery.min.js");
  page.onConsoleMessage = function(msg) {
    console.log('CONSOLE: ' + msg);
  };
  page.onCallback = function(data) {
    checkpoint();
  };
}

var checkpoint = function() {
  page.render('checkpoint_' + (id++) + '.png');
};

function authenticate(username, password, cb) {
  page.open('https://github.com/login?return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D75b98bf809ad1a6880c7%26redirect_uri%3Dhttp%253A%252F%252Fbookstrap.hackreactor.com%252Fauth%252Fgithub%252Fcallback%26response_type%3Dcode%26scope%3Duser%252Crepo', function(status) {

    setup();
    page.injectJs("jquery.min.js");
    // prompt.start();
    // prompt.get(['username', 'email'], function(err, result) {
      // console.log(result.username);
    // });
    // prompt('What is your username?');
    var th = page.evaluate(function(username, password) {
      $('#login_field').val(username);
      $('#password').val(password);
      $('.auth-form-body .btn').click();
    }, username, password);
    checkpoint();
    setTimeout(function() {
      checkpoint();
      cb();
    }, 10000);
    
    // page.render('signin.png');
  });
}

function checkin() {
  console.log('THING');
  page.open('http://bookstrap.hackreactor.com/attendance', function() {
    setTimeout(function() {
      page.evaluate(function() {
        $('.ready-to-learn').click();
      });
      setTimeout(function() {
        checkpoint();
        phantom.exit();
      },1000);
    }, 1000);
  });
}

authenticate(grump_username, grump_password, checkin);
