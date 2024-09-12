import crypto from 'crypto';

export const generateToken = (): string => {
    const secret = crypto.randomBytes(16).toString('hex');
    return secret;
}