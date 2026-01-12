import * as SibApiV3Sdk from 'sib-api-v3-sdk';

const client = SibApiV3Sdk.ApiClient.instance;

// Configura tu API Key de Brevo
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY || '';

export default client;
