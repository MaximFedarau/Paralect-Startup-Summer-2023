import type { NextApiRequest, NextApiResponse } from "next";

import { getVacancies } from "api";

interface Query {
  keyword?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { keyword } = req.query as Query;
    try {
      const data = await getVacancies(keyword);
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
