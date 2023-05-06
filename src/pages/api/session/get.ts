import type { NextApiHandler } from "next/types";

import { withSessionApi } from "src/utils/session";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405);
  }

  return res.status(200).send({ ...req.session });
};

export default withSessionApi(handler);
