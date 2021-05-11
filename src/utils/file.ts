import {createReadStream, PathLike, statSync} from "fs";
import {Response} from "express";

export const streamXmlFile = (filePath: PathLike, res: Response) => {
    const stat = statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': stat.size
    });

    const readStream = createReadStream(filePath);

    readStream.pipe(res);
}
