const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const TEMPLATES_URL = 'https://api.memegen.link/templates/';
const SETTINGS = {method: 'Get'};

