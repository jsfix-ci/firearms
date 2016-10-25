'use strict';

let I;

const TRANSLATIONS = require('../../translations/en/default');
const PAGES = TRANSLATIONS.pages;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'storage-postcode',
  'address-url': 'storage-address',
  'address-lookup-url': 'storage-address-lookup',

  fields: {
    postcode: '#storage-postcode',
    'address-manual': '#storage-address-manual',
    'address-lookup': '#storage-address-lookup'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU'
  },

  getHeaderTranslations(handleType, storageType){
    if (handleType === 'weapons,ammunition') {
      return PAGES['storage-address'].header['weapons-ammunition']['weapons,ammunition']['storage-weapons-ammo'][storageType];
    } else {
      return PAGES['storage-address'].header['weapons-ammunition'][handleType];
    }
  },

  correctTranslationsShown(handleType, storageType) {
    const translation = this.getHeaderTranslations(handleType, storageType);
    I.see(translation);
    this.fillFormAndSubmit(this.fields.postcode);
    I.see(translation);
    I.click(this.links['cant-find-address']);
    I.see(translation);
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillFormAndSubmit(this.fields.postcode);
    I.selectOption(this.fields['address-lookup'], this.content.address);
    I.submitForm();
  }
};