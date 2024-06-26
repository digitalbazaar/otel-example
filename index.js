import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api'
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici'

// For troubleshooting, set the log level to DiagLogLevel.DEBUG / INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const resource = new Resource({ [SEMRESATTRS_SERVICE_NAME]: 'otel-example' })
const exporter = new ConsoleSpanExporter()
const processor = new SimpleSpanProcessor(exporter)

const sdk = new NodeSDK({
  resource,
  autoDetectResources: false,
  spanProcessors: [processor],
  instrumentations: [new UndiciInstrumentation()],
})

sdk.start()

const response = await fetch('https://github.com/');
const body = await response.text();
// console.log(body);
