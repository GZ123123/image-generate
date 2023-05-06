import type { NextApiHandler } from "next/types";

import NextCors from "nextjs-cors";

import { withSessionApi } from "src/utils/session";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405);
  }

  await NextCors(req, res, {
    methods: ["PUT"],
    origin: "imiprompt.vtcode.vn",
    optionsSuccessStatus: 200,
    credentials: true,
  });

  req.session = {
    ...req.session,
    ...req.body,
  };

  await req.session.save();

  return res.status(200).send({ ...req.session });
};

export default withSessionApi(handler);
