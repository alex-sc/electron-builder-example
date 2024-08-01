exports.default = async function(configuration) {
    const pemPath = __dirname;
    require("child_process").execSync(
        `jsign --storetype AWS --keystore eu-central-1 --storepass "<aws_access_key_id>|<aws_secret_access_key>" --alias <key_id> --tsaurl http://timestamp.sectigo.com --certfile ${pemPath}/chain-2024.pem \"${configuration.path}\"`,
        {
            stdio: "inherit"
        }
    );
};
