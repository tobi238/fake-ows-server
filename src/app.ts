import express, {Application, NextFunction, Request, Response} from "express";
import {join} from "path";
import {streamXmlFile} from "./utils/file";
import {validateMinRequiredParams} from "./middleware/validateMinRequiredParams";
import {checkForUrlAuthParams} from "./middleware/checkForUrlAuthParams";


/** create express app instance */
const app: Application = express();
const port: number = Number(process.env.PORT) || 3001;

/** apply global middlewares */
const cors = require("cors");
app.use(cors());
app.use(validateMinRequiredParams);
app.use(checkForUrlAuthParams);

/** respond with anything in here */
const respondWithXmlFile = (req: Request, res: Response, next: NextFunction) => {
  const filePath = join(`./assets/WMS/1.3.0/ServiceExceptionReport-forbiddenFormat.xml`);
  res.statusCode = 200;
  return streamXmlFile(filePath, res);
}
// app.use(respondWithXmlFile);

/** map all requests based on the minimum required params to a matching xml file */
app.get("/", (req: Request, res: Response) => {
  const { service, version, request } = req.query;
  const filePath = join(`./assets/${service}/${version}/${request}.xml`);
  return streamXmlFile(filePath, res);
});

/** start the app */
app.listen(port, () => {
  console.log(
    `Running in NODE_ENV ${process.env.NODE_ENV}. Listening on port ${port}`
  );
});
