import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const api = new aws.apigatewayv2.Api("api", { protocolType: "WEBSOCKET" });

const echoHandler = new aws.lambda.CallbackFunction("echoHandler", {
  callback: async (event: any) => ({ statusCode: 200, body: event.body })
});

const integration = new aws.apigatewayv2.Integration("defaultIntegration", {
  apiId: api.id,
  integrationType: "AWS_PROXY",
  integrationUri: echoHandler.invokeArn,
});

const defaultRoute = new aws.apigatewayv2.Route("defaultRoute", {
  apiId: api.id,
  routeKey: "$default",
  target: pulumi.interpolate`integrations/${integration.id}`,
});

const deployment = new aws.apigatewayv2.Deployment("deployment",
  { apiId: api.id },
  { dependsOn: [defaultRoute]}
);

const stage = new aws.apigatewayv2.Stage("stage", {
  apiId: api.id,
  name: "dev",
  deploymentId: deployment.id,
});

export const url = pulumi.interpolate`${api.apiEndpoint}/${stage.name}`;