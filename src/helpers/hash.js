import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constants';

/**
*   @fileOverview - password generator method
*   @exports passwordHash
* */

export const passwordHash = password => bcrypt.hash(password, Number(SALT_ROUNDS));

export const comparePasswords = (userPass, hashedPass) => bcrypt.compare(userPass, hashedPass);
