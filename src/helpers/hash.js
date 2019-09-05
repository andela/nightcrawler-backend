import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constants';

/**
* @fileOverview - password generator method
* @exports passwordHash
*/
const passwordHash = async password => bcrypt.hash(password, Number(SALT_ROUNDS));
const comparePasswords = async (userPass, hashedPass) => bcrypt.compare(userPass, hashedPass);

export { passwordHash, comparePasswords };
