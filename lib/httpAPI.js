var http = require('./http');
var _ = require('./utils/tinydash');

function HttpAPI(options) {
  options || (options = {});

  _.extend(this, options);
}

HttpAPI.prototype = {
  get: function () {
    return this.request.apply(this, argumentsWithMethod(arguments, 'GET'));
  },
  put: function () {
    return this.request.apply(this, argumentsWithMethod(arguments, 'PUT'));
  },
  post: function () {
    return this.request.apply(this, argumentsWithMethod(arguments, 'POST'));
  },
  delete: function () {
    return this.request.apply(this, argumentsWithMethod(arguments, 'DELETE'));
  },
  request: function (method, url) {
    var options;

    if (_.isString(url)) {
      options = _.extend({
        url: url
      });
    } else {
      options = url;
    }

    options.method = method;

    return request(options, this.baseUrl);
  }
};

function argumentsWithMethod(args, method) {
  args = _.toArray(args);
  args.unshift(method);

  return args;
}

function request(options, baseUrl) {
  if (baseUrl) {
    var separator = '';
    var firstCharOfUrl = options.url[0];
    var lastCharOfBaseUrl = baseUrl[baseUrl.length - 1];

    // Do some text wrangling to make sure concatenation of base url
    // stupid people (i.e. me)
    if (lastCharOfBaseUrl !== '/' && firstCharOfUrl !== '/') {
      separator = '/';
    } else if (lastCharOfBaseUrl === '/' && firstCharOfUrl === '/') {
      options.url = options.url.substring(1);
    }

    options.url = baseUrl + separator + options.url;
  }

  return http.request(options);
}

module.exports = HttpAPI;