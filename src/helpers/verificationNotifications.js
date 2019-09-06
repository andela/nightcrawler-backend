import { VERIFY_URL } from '../config/constants';

export const verificationSuccessEmail = () => `Hello!, \n
    You have successfully confirmed your email. Use your lastname as your password to signin into the application. \n

    Thanks,\n
    Barefoot Nomad Team.`;


export const verifyEmail = (to, token) => {
  const url = `${VERIFY_URL}?token=${token}`;
  return `Confirm your email address on Barefoot Nomad, \n
    Hello! You have been added as a user on Barefoot Nomad and we just need to verify that ${to} is your email address. \n
    Click the link to confirm email. ${url} \n
    Thanks,\n
    Barefoot Nomad Team.`;
};
