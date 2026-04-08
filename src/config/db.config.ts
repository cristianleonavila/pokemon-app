export default () => ({
    database: {
        mongodb: process.env.MONGO_DB,
        port: process.env.PORT
    }
});