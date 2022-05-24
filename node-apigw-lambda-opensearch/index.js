const { Client, Connection } = require("@opensearch-project/opensearch");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const aws4 = require("aws4");

const host = 'https://search-movies-ri7jydp6zkvzrlkxmzf2zlhsdm.ap-northeast-1.es.amazonaws.com/' // e.g. https://my-domain.region.es.amazonaws.com

const createAwsConnector = (credentials, region) => {
  class AmazonConnection extends Connection {
      buildRequestObject(params) {
          const request = super.buildRequestObject(params);
          request.service = 'es';
          request.region = region;
          request.headers = request.headers || {};
          request.headers['host'] = request.hostname;

          return aws4.sign(request, credentials);
      }
  }
  return {
      Connection: AmazonConnection
  };
};

const getClient = async () => {
  const credentials = await defaultProvider()();
  return new Client({
      ...createAwsConnector(credentials, 'ap-northeast-1'),
      node: host,
  });
}

const addDoc = async () => {
  // Initialize the client.
  const client = await getClient();

  // Create an index.
  const indexName = "test-index";

  // let response = await client.indices.create({
  //     index: indexName,
  // });

  // console.log("Creating index:");
  // console.log(response.body);

  // Add a document to the index.
  const document = {
      "title": "Moneyball",
      "director": "Bennett Miller",
      "year": "2011"
  };

  const response = await client.index({
      index: indexName,
      body: document
  });

  return response.body;
}

exports.handler =  async function(event, context) {
    const responseBody = await addDoc().catch(console.log);

    const response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };

    return response;
}
