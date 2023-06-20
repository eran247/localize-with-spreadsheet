
const Localize = require("./index");
const config = require('./config.js');

const { credentials, spreadsheetKey, iosPath, androidPath } = config;

Localize.fromGoogleSpreadsheet(credentials, spreadsheetKey, '*')
.then(localizer => {
  localizer.setKeyCol('key');
  localizer.setDefaultLanguage('en');
  
  const languages = ['en', 'nl'];
  
  // Android (Default language)
  localizer.save(`${androidPath}/values/strings.xml`, { valueCol: localizer._defaultLanguage, format: "android" })
  
  languages.forEach(language => {
    
    /// iOS
    const iosFullPath = `${iosPath}/${language}.lproj/Localizable.strings`;
    localizer.save(iosFullPath, {
      valueCol: language,
      format: 'ios'
    });
    
    /// Android (Other languages)
    const androidFullPath = `hello247_app_android/src/main/res/values-${language}/strings.xml` 
    localizer.save(
      androidFullPath, {
        valueCol: language,
        format: 'android'
      })})
    });