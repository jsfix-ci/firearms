'use strict';

module.exports = data => {
  const response = {};

  response.AuthorityType = 'Shooting club';
  response.ApplicationType = data.activity === 'new' ? 'Initial application' : 'Renewal';

  if (data.activity === 'renew') {
    response['Cusomter.CustomerReference'] = data['reference-number'];
    response.ExistingAuthorityReference = data['authority-number'];
  }

  response['Customer.Name'] = data['club-name'];
  response['Customer.Address'] = data['club-address'];

  response['Agent.Name'] = data['club-secretary-name'];
  response['Agent.Address'] = data['club-secretary-address'];

  response['Customer.Email'] = data['club-secretary-email'];
  response['Customer.Phone'] = data['club-secretary-phone'];

  response['SecondaryContact.Name'] = data['second-contact-name'];
  response['SecondaryContact.Address'] = data['second-contact-address'];
  response['SecondaryContact.Email'] = data['second-contact-email'];
  response['SecondaryContact.Phone'] = data['second-contact-phone'];

  data['location-addresses'].forEach((address, i) => {
    const index = i + 1;
    response[`ShootingRange${index}.Address`] = address.address;
    response[`ShootingRange${index}.Firearms`] = address['address-category'].join(', ');
  });

  data['all-storage-addresses'].forEach((address, i) => {
    const index = data['location-addresses'].length + i + 1;
    response[`ShootingRange${index}.Address`] = address.address;
  });

  return response;
};
