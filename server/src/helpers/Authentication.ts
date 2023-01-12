import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class Authentication {
  public static hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static comparePassword = async (
    password: string,
    encryptedText: string
  ): Promise<boolean> => {
    let result = await bcrypt.compare(password, encryptedText);
    return result;
  };

  public static generateToken = (
    id: number,
    username: string,
    password: string
  ): string => {
    const secretKey: string = process.env.JWT_SECRET_KEY || "rahasia";

    const token: string = jwt.sign({ id, username, password }, secretKey);

    return token;
  };

  public static verifyToken = (token: string): string | jwt.JwtPayload => {
    const secretKey: string = process.env.JWT_SECRET_KEY || "rahasia";

    return jwt.verify(token, secretKey);
  };
}

export default Authentication;
