const Localize = require("localize-with-spreadsheet");
const config = require('./config.js');

const { credentials, spreadsheetKey, resourcePath } = config;

Localize.fromGoogleSpreadsheet(credentials, spreadsheetKey, '*')
  .then(localizer => {
    localizer.setKeyCol('key');
    localizer.setDefaultLanguage('nl');

    const languages = ['en', 'nl'];

    languages.forEach(language => {
      const path = `${resourcePath}/${language}.lproj/Localizable.strings`;

      localizer.save(path, {
        valueCol: language,
        format: 'ios'
      });
    });
  });
