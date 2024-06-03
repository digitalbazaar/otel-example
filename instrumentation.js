import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api'

import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici'

// For troubleshooting, set the log level to DiagLogLevel.DEBUG / INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const resource = new Resource({ [SEMRESATTRS_SERVICE_NAME]: 'otel-example' })
const exporter = new ConsoleSpanExporter()
const processor = new SimpleSpanProcessor(exporter)
const tracerProvider = new NodeTracerProvider({ resource })

tracerProvider.addSpanProcessor(processor)
tracerProvider.register()

registerInstrumentations({ instrumentations: [new UndiciInstrumentation()] })





// import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api';
// import {ConsoleSpanExporter} from '@opentelemetry/sdk-trace-base';
// import {NodeSDK} from '@opentelemetry/sdk-node';
// import {UndiciInstrumentation} from '@opentelemetry/instrumentation-undici';

// // For troubleshooting, set the log level to DiagLogLevel.DEBUG / INFO
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// const sdk = new NodeSDK({
//   traceExporter: new ConsoleSpanExporter(),
//   instrumentations: [new UndiciInstrumentation()],
// });

// sdk.start();

