exports.default = async function(configuration) {
    const DIGICERT_API_KEY = process.env.DIGICERT_API_KEY;
    const DIGICERT_CERT_ALIAS = process.env.DIGICERT_CERT_ALIAS;
    const DIGICERT_CLIENT_CERT_PATH = process.env.DIGICERT_CLIENT_CERT_PATH;
    const DIGICERT_CLIENT_CERT_PASSWORD = process.env.DIGICERT_CLIENT_CERT_PASSWORD;

    require("child_process").execSync(
        `java -jar jsign-6.0.jar --storetype DIGICERTONE --storepass "${DIGICERT_API_KEY}|${DIGICERT_CLIENT_CERT_PATH}|${DIGICERT_CLIENT_CERT_PASSWORD}" --alias ${DIGICERT_CERT_ALIAS} \"${configuration.path}\"`,
        {
            stdio: "inherit"
        }
    );
};
