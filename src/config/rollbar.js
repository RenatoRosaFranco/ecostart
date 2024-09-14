import Rollbar from 'rollbar';

const rollbar = new Rollbar({
    accessKey: process.env.ROLLBAR_ACCESS_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.ROLLBAR_ENV,
    },
})

export default rollbar;