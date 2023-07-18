# Serverless Websocket Echo Example

This example demonstrates how to setup a websocket API with API Gateway and AWS Lambda.
The API has a single route `$default` that accepts a request and echos it back in the response.
All the infrastructure for this example is managed by Pulumi.

## Prerequisites
You will need to [download and install the Pulumi CLI][pulumi-install]. Once installed, you will need to [configure Pulumi to use your AWS account][pulumi-aws-setup].

## Running the App

Clone this repo and from this working directory run:

```
$ pulumi up
```

This will deploy the changes and output the URL for the created API Gateway. It will look something like this:

```
Outputs:
    url: "wss://<YOUR_API_GATEWAY_URL_HERE>.execute-api.us-east-1.amazonaws.com/dev"
```

You can use a tool like [wscat][wscat] to test the API. Run the following command to connect to the API:

```bash
$ wscat -c wss://<YOUR_API_GATEWAY_URL_HERE>.execute-api.us-east-1.amazonaws.com/dev
```

[pulumi-install]: https://www.pulumi.com/docs/get-started/install/
[pulumi-aws-setup]: https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/
[wscat]: https://github.com/websockets/wscat