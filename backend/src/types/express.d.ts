import type { Request } from 'express';
import type { User } from './types.ts';

export declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

