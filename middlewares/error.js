import logger from "../helpers/logger.js";

export default function error(err, req, res, next) {
  logger.error(err.message, { metadata: err });

  res.status(500).send("Something failed.");
}
