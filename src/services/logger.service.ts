import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { hostname } from 'os';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = req;
    console.log(
      `REQ: [${hostname}] "${method} ${url}" params: ${JSON.stringify(
        req.params,
      )} body: ${JSON.stringify(req.body)}`,
    );
    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      console.log(
        `RES: [${hostname}] "${method} ${url}" ${statusCode} ${statusMessage} "${ip}"`,
      );
    });

    next();
  }
}
