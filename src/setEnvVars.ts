import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:8080';
process.env.NEXT_PUBLIC_DOMAIN = 'localhost';
