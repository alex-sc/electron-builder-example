exports.default = async function(configuration) {
    const pemPath = __dirname;
    require("child_process").execSync(
        `jsign --storetype DIGICERTONE --storepass "<api-key>|/path/to/Certificate_pkcs12.p12|<password>" --alias test \"${configuration.path}\"`,
        {
            stdio: "inherit"
        }
    );
};
