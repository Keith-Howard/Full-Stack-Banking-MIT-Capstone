const admin = require('firebase-admin');

const type = "service_account";
const project_id = "courso-bf828";
const private_key_id = "0e37b5d030883dca24cc1af0a57177803cf0dbcd";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5I15jS9aHFYj0\nTyroSB7jnDtRHcLlJ2d7aKvvCmblDigUYPWM/kHZIRxT0GZMUN03w7XFCrFeSJzp\nPo5K+FZr5aMh17sD7YrEZ5NgcAF71ynm7xfPcWrHPwWrJHO/nm1aEvfd8Xm/0WUl\nXwwPINCShf2D5TdlAqLjxBdR3rj2skQoNvdS9z0XFd3PCTWM0ySdCcM4/4GTskRe\nQ/qqQr+zNuNe7R3CpHcpBfPNFg7CtXTu8kpG3BWSfOrGDxkvThmUqmTzio2T6cdo\nZrr+obnTiNCh28nRgflUun/dKWmZDVNsouHZOk5z8TiTWOzdTRZ0sfXz7JNclc6u\n1H4c+1NhAgMBAAECggEAPb8DkGdvNZ9jjWPIAi9nie8Fw4CDC01QkJKw4SkddyB5\nEo7h5nO4P3PxEC0NqT9BAIO34G84B6N9Hbd82pknrZWpijR6jY1Qfj+zIfNJM2Xn\n9jrgvJFtlOU6fUFLj2mFvAhefbm3Ktfp/YRNL9B4b53blv1AM+KktAUm5+m506DA\nlRT+V7sHcEe+M1uRIa24tNXZdQP9T+u+l4UJY7GrDVxo1mTiAvnfjhpupTJDKijG\noIREdUNmlY5H0023O3hllCvG5smO3riOqysrHLyK+sQEdytBDnjrefH2lembAMOD\noQO3fxmV8LhRY3GA+TfEnOy85Dh8ADvB2TvsXavWHwKBgQDhzylfN37MhtTkygc2\nMW3RKCBmP1sOz6I/PmTVkDhU5z7mV3d/R6BYi46MtV94QafStHdwCUAvgOwqwlB5\nRL6zjsiPXhdP8zkYN9Kr2yUo293mi4D8bABHjt2CIEz9r6su5+SwGSvLhhsNsFrX\n9xGnW0MvezFoAxQQmW3DVmoD2wKBgQDR5CWI63arTvM9KP2QhXZE4tGGfyCTlab3\nkIMy+96L0CyA8j17xGOA7AU9n714cJMpVNbpMOKi8MRVBD9t8aCA79do2kKNGQW+\n5KlfQdlFmfzHuLH/Sba6XYsL1DmEZEkRamFqcgXkCZLwJZVpEpDjbETpfdzPY3cM\nXMQ9JLJIcwKBgQDHn41ymKvnAdeZfyTK+v2bZv7lhWLpgBNuF6mqxzmVjW0k0vRY\nOCj/vjhCGmGQ/XHwqwvfpr3wgOfHkUr1OhngwPx7CfJQArRZvZfnx+9c5KqSEofw\nH0ZL/HfEfuuxZahO6kBYkZgO77pg6qQUwl3/9oU5p43w5q/JUOohQvar+wKBgD+Z\nE86DGngZ+hYkH4D1D7sbx0UrrCFMDUWiYj7Gls5ii7merQadoVDlM0lS58RgyBaU\nAHK0P1gEAFmKafXUaz/mbKz2xYefd2A6RR/6Ae3XFQMncbfbDCU4RvOUoMD+6iz+\nwPnSBvrr87wUh0tJNuHSYqclXgzxJJd4XHXycpsFAoGBAJ98lnXkmEvqnrztFmvp\n4l3eUrKSMtVY8uvonHsHWCWC2N1ZSsBiLt1lhgD7YTkyKDQaHgGpihPqpTwNk6oE\nSOTPaTsPf09PxKFyFCTRQ5TxIucPlNmQY8us1SQcHBSYqAviF2qB3HwjbMJBvwgP\nxNDgcTol47QKdmkoD2tC0PCA\n-----END PRIVATE KEY-----\n";
const client_email = "firebase-adminsdk-hl9ml@courso-bf828.iam.gserviceaccount.com";
const client_id = "113821571424634596657";
const auth_uri = "https://accounts.google.com/o/oauth2/auth";
const token_uri = "https://oauth2.googleapis.com/token";
const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
const client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hl9ml%40courso-bf828.iam.gserviceaccount.com";

/* const type = "";
const project_id = "";
const private_key_id = "";
const private_key = ""
const client_email = "";
const client_id = "";
const auth_uri = "";
const token_uri = "";
const auth_provider_x509_cert_url = "";
const client_x509_cert_url = ""; */

// credential grants access to Firebase services
admin.initializeApp({
    credential: admin.credential.cert({
        type,
        project_id,
        private_key_id,
        private_key:
          private_key.replace(/\\n/g,'\n'),
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url
    }),
  });

module.exports = admin;