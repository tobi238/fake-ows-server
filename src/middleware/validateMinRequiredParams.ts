import {NextFunction, Request, Response} from "express";
import {streamXmlFile} from "../utils/file";
import {DEFAULT_VERSIONS} from "../constants";

/**
 * Middleware to check if the minimal required params service and request are set.
 * It also checks the version parameter and sets a default value, if it is missing.
 * @param req
 * @param res
 * @param next
 */
export function validateMinRequiredParams(req: Request, res: Response, next: NextFunction) {
    const {service, version, request} = req.query;

    console.log(`received request "${request}" for service "${service}" with version "${version}"`);

    if (!service) return streamXmlFile(`./assets/OWS/ExceptionReport-MissingParameterValue-service.xml`, res)
    if (!request) return streamXmlFile(`./assets/OWS/ExceptionReport-MissingParameterValue-request.xml`, res)

    if (!version) {
        const defaultVersion = DEFAULT_VERSIONS.get(String(service));
        req.query.version = defaultVersion
        console.warn(`version parameter missing, using default version "${defaultVersion}"`);
    }

    next();
}
