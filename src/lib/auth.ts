import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}