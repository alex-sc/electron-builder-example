import fs from 'fs';
import * as path from "path";

exports.default = async function(configuration) {
    const DIGICERT_API_KEY = process.env.DIGICERT_API_KEY;
    if (!DIGICERT_API_KEY) {
        console.error("DIGICERT_API_KEY env var not set");
        return
    }

    const DIGICERT_CERTIFICATE_ALIAS = process.env.DIGICERT_CERTIFICATE_ALIAS;
    if (!DIGICERT_CERTIFICATE_ALIAS) {
        console.error("DIGICERT_CERTIFICATE_ALIAS env var not set");
        return
    }

    const DIGICERT_CLIENT_CERTIFICATE_PASSWORD = process.env.DIGICERT_CLIENT_CERTIFICATE_PASSWORD;
    if (!DIGICERT_CLIENT_CERTIFICATE_PASSWORD) {
        console.error("DIGICERT_CLIENT_CERTIFICATE_PASSWORD env var not set");
        return
    }

    // cat Certificate_pkcs12.p12 | base6
    const DIGICERT_CLIENT_CERTIFICATE_BASE64 = process.env.DIGICERT_CLIENT_CERTIFICATE_BASE64;
    if (!DIGICERT_CLIENT_CERTIFICATE_BASE64) {
        console.error("DIGICERT_CLIENT_CERTIFICATE_BASE64 env var not set");
        return
    }

    // Decode client certificate from base64 and save to file for jsign use
    const certificateBuffer = Buffer.from(DIGICERT_CLIENT_CERTIFICATE_BASE64, 'base64');
    const outputFilePath = path.join(__dirname, "Certificate_pkcs12.p12");
    fs.writeFileSync(outputFilePath, certificateBuffer);

    require("child_process").execSync(
        `java -jar jsign-6.0.jar --storetype DIGICERTONE --storepass "${DIGICERT_API_KEY}|Certificate_pkcs12.p12|${DIGICERT_CLIENT_CERT_PASSWORD}" --alias ${DIGICERT_CERT_ALIAS} \"${configuration.path}\"`,
        {
            stdio: "inherit"
        }
    );
};
