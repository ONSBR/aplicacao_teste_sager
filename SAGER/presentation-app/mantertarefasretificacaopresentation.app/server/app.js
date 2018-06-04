const dispatcher = require("./dispatcher/dispatcher");
const SDK = require("plataforma-sdk/worker/sdk");
const api = require("./api");

SDK.bind(dispatcher).serve(api);
