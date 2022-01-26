var Localize = require("localize-with-spreadsheet");

const credentials = {
  type: "service_account",
  project_id: "jamble-9d0ef",
  private_key_id: "cda4040a60163394275eebdc46d42f8cbc9fa02f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDDTwz7to2Jb/e7\nHabN9EzMSuKNVkS59GQYBHPO/FXLfUeDOg9aSjJQiQfL+H1QvF+mQiFz6q1zRKbv\nelE56NgKOqrfxz3PpqQkxSc5kweSFLKAkcF9I7rVrtm3iKnWEZSf/4l3E/n/vNf7\nXRm+fix3g31wwTTnETjl/CC5oY8tzgvqPvu8D441Q9fqHmnnOakOxocMaelNSW9T\n0+HSS82m0RpAsUvZriOfVmKaBMFTfHej8IJh4D7XO/g43efwoSfV+BvYZXdelmYC\nSdkc6QsqoTfVwYViU4qYq1BJ3NTDm01kKoW9vaoGI1DiNVHqT4zvYs71tGSl/fNe\nD2IyNX0LAgMBAAECggEAJcxpQ1fXuZcZVzXMYASdTlZZ1SeygliZfIp0DUWJpym2\nSt/UM9GzPiHfB+st+Y+TZV5cEg6DhhDty+Ac0zvMf+JNyqRJQqRKFTGwvzRE3VEz\nIK3UyA6/rHY7/Yit8deSL4rphEmx8vwNwsCIaHULzw98GfPSdLvBCsWKYdKyHpdw\n6pVHtLxb8jq5QW3o6rft8+QXYekw0sYBcEWxokB1jvbb02oEmLe/gLceCsEH5sXo\njIpTw0j8+WfHgOxCoY1XF/BOmUtGVIWS+wYZH8Q1QGL2LA8waJZiZ2o54ityYdzu\nZfRiJZmy7t+IfTMos7fefEtjahk3CjTI1aJeDQJeSQKBgQDg3o2KWPurOGjWu0A2\nX/eXbxHPV0IN9st/aQiuNWp/KmknAT2k1wOG84OkVPEc/103DsGXtMUGmlVBcLXr\nv1tiBBr11/RHTMBwdHJfH7VKqRd0iVzAX4jRQrmZfWJWX7zxi54B2x4JcjhJUu7L\nJzwQQiHb5zaXAP5/Srn0PGKjowKBgQDeWNyPP50U66ARifQk4eqRrEJhqhqH45mD\nkMBnvQK8EJiytHhN9IVUB+Dv8cwbk+/LPFjh8clRrn1wCK2cOQYPV+flQBgQamdf\nZTsCbG2HB+/mvZYuD75xPltepgWZR1UlChLyWdoO83Ap/QV58BBs0bVA+d8D64sf\nsv4pW7uXeQKBgDtr0+8pEGfwYhPMK22y8lQ773Lg1f2mp6Old7vBNcEgzeSWuVlj\nz/TLSJAWOhi1ikZQSevywtW51qmSRSBk0psWBqHMTSrCJ2AQBWEJmfh+skoDOlVD\naX4SqcTbky7L4bvabwiChG9ulV0a4ysf1Qle0F+xu4UvqBCvCHB3vIENAoGAZBWj\n0mdUEeKuPrbWSvPWXpQnnUawgpKUu4Ag25Fc9cKSuX462PxEN7sEKX2x3ogM3HLh\nn3Lyp+3fUNrXKwcQD0AGhk7/hgQfW/V5RnIAK1QLTNXyD/HOS7NB9azNwF03mmCa\nfrSrTyeNSZk3KdhBzHnpGMJg/Ka+DRrJBVzhaCECgYB6ulJwwMD75LTdKZ+QV/Q5\nYWVkSY/fOSXZk2tDBOSRBee6WpguXGHdufRn9xk2HFIjv9zAMrd04VvuK2bXs/EY\nsECgmYJnuZroky56hKY2ccqtuqSFjotlkEvLWbmZUyBHR/cDjv8QSs9ARn2I2xUD\n2FCrSXtPZJI/7xY0OphOSQ==\n-----END PRIVATE KEY-----\n",
  client_email: "jamblsheets@jamble-9d0ef.iam.gserviceaccount.com",
  client_id: "115938505886357020810",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/jamblsheets%40jamble-9d0ef.iam.gserviceaccount.com",
};

const spreadsheet_key = "";
Localize.fromGoogleSpreadsheet(credentials, "1XXcO5KG_tlmilPG8sX9I-EvIkAs8wqFWuUN4a67q58s", "*").then(
  (localizer) => {
    localizer.setKeyCol("String ID");
    localizer.setDefaultLanguage('en')

    localizer.save("Base.lproj/Localizable.strings", { valueCol: "English", format: "ios" });
    localizer.save("zh.lproj/Localizable.strings", { valueCol: "Chinese S", format: "ios" });
    localizer.save("zh-tw.lproj/Localizable.strings", { valueCol: "Chinese T", format: "ios" });
    localizer.save("fr.lproj/Localizable.strings", { valueCol: "French", format: "ios" });
    localizer.save("de.lproj/Localizable.strings", { valueCol: "German", format: "ios" });
    localizer.save("it.lproj/Localizable.strings", { valueCol: "Italian", format: "ios" });
    localizer.save("ja.lproj/Localizable.strings", { valueCol: "Japanese", format: "ios" });
    localizer.save("ko.lproj/Localizable.strings", { valueCol: "Korean", format: "ios" });
    localizer.save("pt.lproj/Localizable.strings", { valueCol: "Portuguese", format: "ios" });
    localizer.save("ru.lproj/Localizable.strings", { valueCol: "Russian", format: "ios" });
    localizer.save("es.lproj/Localizable.strings", { valueCol: "Spanish", format: "ios" });
    
    localizer.save("android/Base.lproj/Localizable.strings", { valueCol: "English", format: "android" });
    localizer.save("android/zh.lproj/Localizable.strings", { valueCol: "Chinese S", format: "android" });
    localizer.save("android/zh-tw.lproj/Localizable.strings", { valueCol: "Chinese T", format: "android" });
    localizer.save("android/fr.lproj/Localizable.strings", { valueCol: "French", format: "android" });
    localizer.save("android/de.lproj/Localizable.strings", { valueCol: "German", format: "android" });
    localizer.save("android/it.lproj/Localizable.strings", { valueCol: "Italian", format: "android" });
    localizer.save("android/ja.lproj/Localizable.strings", { valueCol: "Japanese", format: "android" });
    localizer.save("android/ko.lproj/Localizable.strings", { valueCol: "Korean", format: "android" });
    localizer.save("android/pt.lproj/Localizable.strings", { valueCol: "Portuguese", format: "android" });
    localizer.save("android/ru.lproj/Localizable.strings", { valueCol: "Russian", format: "android" });
    localizer.save("android/es.lproj/Localizable.strings", { valueCol: "Spanish", format: "android" });
  }
);

