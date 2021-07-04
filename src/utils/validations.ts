export function ValidateEmail(mail: string): boolean {
  const isEmailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    mail,
  );
  if (isEmailValid) {
    return true;
  }
  return false;
}
