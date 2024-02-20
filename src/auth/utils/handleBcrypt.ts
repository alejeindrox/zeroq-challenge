import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

/**
 * Encrypt password
 * @param passwordPlain
 * @returns
 */
async function generateHash(passwordPlain: string): Promise<string> {
  const hash = await bcrypt.hash(passwordPlain, saltOrRounds);
  return hash;
}

/**
 * Compare password encrypted
 * @param plain
 * @param hash
 * @returns
 */
async function compareHash(plain: string, hash: string): Promise<any> {
  return await bcrypt.compare(plain, hash);
}

export { generateHash, compareHash };
