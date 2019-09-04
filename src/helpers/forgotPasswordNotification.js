export const emailBody = (name, URL, token) => {
  const url = `${URL}/users/reset-password/${token}`;
  return `Hello ${name},\n
  You are receiving this because you have requested the forgot password \n
  Click on the reset link bellow to complete the process. \n

  ${url}

  Thanks,\n
  Barefoot Nomad Team.`;
};
