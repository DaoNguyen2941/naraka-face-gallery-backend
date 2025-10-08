// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs"

Sentry.init({
    dsn: "https://78ee51b39bd8e76193ca4b5daf9b35a9@o4510145388347392.ingest.us.sentry.io/4510145423671296",

    // Send structured logs to Sentry
    enableLogs: true,

    environment: process.env.NODE_ENV || 'development',

    integrations: [Sentry.consoleLoggingIntegration({ levels: ['log', 'error', 'warn'] })],
    // Tracing
    tracesSampleRate: 0.1, //  Capture 100% of the transactions
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});