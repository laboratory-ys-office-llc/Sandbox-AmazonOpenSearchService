const { Client, Connection } = require("@opensearch-project/opensearch");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const aws4 = require("aws4");

var host = 'https://search-movies-ri7jydp6zkvzrlkxmzf2zlhsdm.ap-northeast-1.es.amazonaws.com/' // e.g. https://my-domain.region.es.amazonaws.com

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

async function search() {

  // Initialize the client.
  var client = await getClient();

  // Create an index.
  var index_name = "test-index";

  var response = await client.indices.create({
      index: index_name,
  });

  console.log("Creating index:");
  console.log(response.body);

  // Add a document to the index.
  var document = {
      "title": "Moneyball",
      "director": "Bennett Miller",
      "year": "2011"
  };

  var response = await client.index({
      index: index_name,
      body: document
  });

  console.log(response.body);
}

exports.handler =  async function(event, context) {
    const responseBody = {
        "key3": "value3",
        "key2": "value2",
        "key1": "value1"
    };

    await search().catch(console.log);

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
