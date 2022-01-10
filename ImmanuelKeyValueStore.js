const Mustache = require("mustache");

class ImmanuelKeyValueStore {
  static get BaseUrl() {
    return "https://keyvalue.immanuel.co/api/KeyVal/";
  }

  static get UpdateUrlPath() {
    return "UpdateValue/{{app_key}}/{{key}}/{{value}}";
  }

  static get GetUrlPath() {
    return "GetValue/{{app_key}}/{{key}}";
  }

  constructor(appId) {
    this.appId = appId;
  }

  GetValueAPI(key) {
    return Mustache.render("{{base_url}}{{get_url_path}}", {
      base_url: ImmanuelKeyValueStore.BaseUrl,
      get_url_path: Mustache.render(ImmanuelKeyValueStore.GetUrlPath, {
        app_key: this.appId,
        key: key,
      }),
    });
  }

  GetUpdateAPI(key, value) {
    return Mustache.render("{{base_url}}{{update_url_path}}", {
      base_url: ImmanuelKeyValueStore.BaseUrl,
      update_url_path: Mustache.render(ImmanuelKeyValueStore.UpdateUrlPath, {
        app_key: this.appId,
        key: key,
        value: value
      }),
    });
  }
}

module.exports = ImmanuelKeyValueStore;

// 3cg7aby9
