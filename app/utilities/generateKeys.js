const { generateKeyPair } = require('node:crypto');
const path = require('node:path');
const fs = require('node:fs/promises');
const FilesystemError = require('../errors/FileSystemError');

/**
 * Generate a public and private keypair used to sign and verify JWTs
 *
 * @param {boolean} forceWrite
 */

async function generateKeys(forceWrite = false) {
  const baseDirectory = 'storage/keys';
  const keyType = process.env.JWT_KEY_TYPE ?? 'rsa';
  const publicKeyFile = path.resolve(baseDirectory, STAGING_JWT_PUBLIC_FILE);
  const privateKeyFile = path.resolve(baseDirectory, STAGING_JWT_PRIVATE_FILE);

  const options = {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem', passphrase: '' },
  };

  if (!forceWrite) {
    try {
      await fs.access(publicKeyFile, fs.constants.R_OK);
      await fs.access(privateKeyFile, fs.constants.R_OK);

      throw new FilesystemError(
        'A JWT key-pair already exists; use the force flag to overwrite them'
      );
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  await fs.mkdir(path.resolve(baseDirectory), { recursive: true });

  return new Promise((resolve, reject) => {
    generateKeyPair(keyType, options, async (error, publicKey, privateKey) => {
      if (error) {
        let customError = new FilesystemError('JWT Key generation failed');

        reject(customError);
      }
      try {
        await fs.writeFile(publicKeyFile, publicKey);

        await fs.writeFile(privateKeyFile, privateKey);

        resolve();
      } catch (error) {
        let customError = new FilesystemError(
          'JWT key-pair could not be written to disk'
        );

        reject(customError);
      }
    });
  });
}

module.exports = {
    generateKeys
}