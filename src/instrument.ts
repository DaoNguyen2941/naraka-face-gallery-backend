import * as Sentry from "@sentry/nestjs"

Sentry.init({
    dsn: process.env.SENTRY_DSN,

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