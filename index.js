const {diag, DiagConsoleLogger, DiagLogLevel} = require('@opentelemetry/api');
const {ConsoleSpanExporter} = require ('@opentelemetry/sdk-trace-base');
const {NodeSDK} = require('@opentelemetry/sdk-node');
const {UndiciInstrumentation} = require('@opentelemetry/instrumentation-undici');
// const fetch = require('node-fetch');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG / INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [new UndiciInstrumentation()],
});

sdk.start();

async function run() {
  const response = await fetch('https://github.com/');
  const body = await response.text();
  // console.log(body);
}

run();
