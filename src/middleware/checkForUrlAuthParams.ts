import {NextFunction, Request, Response} from "express";
import {streamXmlFile} from "../utils/file";

/**
 * Check if url query params user and passwort are present.
 * If so respond with an Exception Report matching the OWSProxy implementation.
 * @param req
 * @param res
 * @param next
 */
export const checkForUrlAuthParams = (req: Request, res: Response, next: NextFunction) => {
    const {user, password} = req.query;
    if (user && password) return streamXmlFile(`./assets/OWSProxy/ExceptionReport-MissingParameterValue-user-password.xml`, res);
    next();
}
