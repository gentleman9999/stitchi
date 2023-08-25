// import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

import { getOrThrow } from '../utils'

const AXIOM_API_KEY = getOrThrow(process.env.AXIOM_API_KEY, 'AXIOM_API_KEY')
const AXIOM_DATASET = getOrThrow(process.env.AXIOM_DATASET, 'AXIOM_DATASET')

// Setting the default Global logger to use the Console
// And optionally change the logging level (Defaults to INFO)
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

// configure a trace exporter to communicate with Axiom
const traceExporter = new OTLPTraceExporter({
  url: 'https://api.axiom.co/v1/traces',
  headers: {
    Authorization: `Bearer ${AXIOM_API_KEY}`,
    'X-Axiom-Dataset': AXIOM_DATASET,
  },
})

// set up the OTel SDK
const sdk = new NodeSDK({
  resource: Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'server',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'local',
    }),
  ),
  spanProcessor: new BatchSpanProcessor(traceExporter),
  instrumentations: [getNodeAutoInstrumentations()],
})

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch(error => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0))
})


