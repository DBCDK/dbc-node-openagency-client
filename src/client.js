'use strict';

import * as BaseSoapClient from 'dbc-node-basesoap-client';

let wsdl = null;

function makeFindLibraryRequest (params) {
  let openagency = BaseSoapClient.client(wsdl, {});
  return openagency.request('findLibrary', params, {}, true);
}

export function getOpenAgency(values) {
  let openagency = BaseSoapClient.client(wsdl, {});

  return values.id.map((val) => {
    return openagency.request('findLibrary', {
      agencyId: val
    }, {}, true);
  });
}

export function searchOpenAgency(values) {
  let params = {
    anyField: '?' + values.query + '?',
    libraryType: 'Folkebibliotek',
    pickupAllowed: 1
  };

  return makeFindLibraryRequest(params);
}

export function pickupAgencyList(params) {
  let openagency = BaseSoapClient.client(wsdl, {});
  return openagency.request('pickupAgencyListRequest', params, {}, true);
}

export const METHODS = {
  getOpenAgency: getOpenAgency,
  searchOpenAgency: searchOpenAgency,
  pickupAgencyList: pickupAgencyList
};

/**
 * Setting the necessary parameters for the client to be usable.
 * The wsdl is only set if wsdl is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */
export function init(config) {
  if (!wsdl) {
    wsdl = config.wsdl;
  }

  return METHODS;
}
