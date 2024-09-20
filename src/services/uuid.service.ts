import crypto from 'crypto';

export default class UUIDService {
  public static generateUUID(): string {
    return crypto.randomUUID();
  }
}