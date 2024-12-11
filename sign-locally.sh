# brew install jsign

jsign --storetype DIGICERTONE \
      --storepass "<api-key>|/path/to/Certificate_pkcs12.p12|<password>" \
      --alias test your_electron_app.exe

