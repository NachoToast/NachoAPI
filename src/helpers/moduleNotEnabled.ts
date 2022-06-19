import { Request, Response } from 'express';
import { Config } from '../types/Config';

export function moduleNotEnabled(moduleName: keyof Config['modules']): (req: Request, res: Response) => void {
    return (_, res) => {
        res.status(501).json(`${moduleName[0].toUpperCase() + moduleName.slice(1)} module is not enabled`);
    };
}
