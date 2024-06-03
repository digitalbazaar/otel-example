import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api';
import {ConsoleSpanExporter} from '@opentelemetry/sdk-trace-base';
import {NodeSDK} from '@opentelemetry/sdk-node';
import {UndiciInstrumentation} from '@opentelemetry/instrumentation-undici';

// For troubleshooting, set the log level to DiagLogLevel.DEBUG / INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [new UndiciInstrumentation()],
});

sdk.start();

const response = await fetch('https://github.com/');
const body = await response.text();
// console.log(body);
