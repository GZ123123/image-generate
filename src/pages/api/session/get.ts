import type { NextApiHandler } from "next/types";

import { withSessionApi } from "src/utils/session";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(404);
  }

  res.send({ ...req.session });
};

export default withSessionApi(handler);
