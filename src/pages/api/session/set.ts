import type { NextApiHandler } from "next/types";

import { withSessionApi } from "src/utils/session";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(404);
  }

  req.session = {
    ...req.session,
    ...req.body,
  };

  await req.session.save();

  res.send({ ...req.session });
};

export default withSessionApi(handler);
