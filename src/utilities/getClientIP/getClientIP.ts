import { IncomingMessage } from 'http';

export const getClientIP = (req: IncomingMessage): string => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string') {
    const [ip] = xForwardedFor.split(',');
    return ip.trim();
  }
  return req.socket.remoteAddress ?? '';
};
