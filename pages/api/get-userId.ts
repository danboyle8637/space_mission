import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Need token from magic.

  // Hit Magic with token and get the userID
  const userId = 123456;

  return res.status(200).json({
    message: "Got the user",
    userId: userId,
  });
};
