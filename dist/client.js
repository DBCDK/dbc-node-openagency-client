'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = OpenAgencyClient;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeBasesoapClient = require('dbc-node-basesoap-client');

var BaseSoapClient = _interopRequireWildcard(_dbcNodeBasesoapClient);

function getOpenAgency(client, values) {

  return values.id.map(function (val) {
    return client.request('findLibrary', {
      agencyId: val
    }, {}, true);
  });
}

function getAgencyBranches(client, values) {

  return values.id.map(function (val) {
    return client.request('pickupAgencyList', {
      agencyId: val
    }, {}, true);
  });
}

function searchOpenAgency(client, libraryType, values) {
  var params = {
    anyField: '?' + values.query + '?',
    libraryType: libraryType,
    pickupAllowed: 1
  };

  return client.request('findLibrary', params, {}, true);
}

/**
 * Setting the necessary parameters for the client to be usable.
 * The wsdl is only set if wsdl is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function OpenAgencyClient(config) {
  var libraryType = config.libraryType;
  var client = BaseSoapClient.client(config.wsdl, {});

  return {
    getOpenAgency: getOpenAgency.bind(null, client),
    getAgencyBranches: getAgencyBranches.bind(null, client),
    searchOpenAgency: searchOpenAgency.bind(null, client, libraryType)
  };
}

module.exports = exports['default'];