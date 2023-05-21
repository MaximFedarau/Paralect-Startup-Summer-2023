import type { NextApiRequest, NextApiResponse } from "next";

import { getVacancies } from "api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getVacancies();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  } else {
    res.status(403);
  }
}
