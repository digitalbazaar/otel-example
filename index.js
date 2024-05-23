// import {
//   ConsoleSpanExporter,
//   NodeTracerProvider,
//   SimpleSpanProcessor,
// } from '@opentelemetry/sdk-trace-node';
import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api';
import {BatchSpanProcessor} from '@opentelemetry/sdk-trace-base';
import {NodeSDK} from '@opentelemetry/sdk-node';
// import {registerInstrumentations} from '@opentelemetry/instrumentation';
import {TraceExporter} from '@google-cloud/opentelemetry-cloud-trace-exporter';
import {UndiciInstrumentation} from '@opentelemetry/instrumentation-undici';

// For troubleshooting, set the log level to DiagLogLevel.DEBUG / INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Initialize the exporter. When your application is running on Google Cloud,
// you don't need to provide auth credentials or a project id.
const exporter = new TraceExporter();

const sdk = new NodeSDK({
  traceExporter: new BatchSpanProcessor(exporter),
  instrumentations: [new UndiciInstrumentation()],
});

sdk.start();
