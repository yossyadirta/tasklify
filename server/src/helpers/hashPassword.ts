import bcrypt from "bcryptjs";

class hashPassword {
  public static hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
}

export default hashPassword;
