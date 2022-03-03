import { endpoints } from "../../src/utils/endpoints";
import { getErrorMessage } from "../../src/utils/utilityFunctions";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  const bodyData = req.body;
  const body = JSON.parse(bodyData);
  const emailAddress = body.emailAddress;

  if (emailAddress !== process.env.TEST_USER_ID) {
    return res.status(400).json({
      message: "You are not allowed to login",
    });
  }

  // Fake verify token... this would be done through Magic

  // get userId from Magic... but here our fake one
  const userId = process.env.TEST_USER_ID;

  // get the user doc from Cloudflare

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.API_DEV_URL
      : process.env.API_URL;

  try {
    const url = `${baseUrl}/${endpoints.GET_USER}`;

    const userDoc = await fetch(url, {
      method: "GET",
      headers: {
        userId: `${userId}`,
      },
    });

    const userData = await userDoc.json();

    // send back user doc with cookie
    return res.status(200).json({
      message: "Success logging in",
      userDoc: userData,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return res.status(500).json({
      message: errorMessage,
    });
  }
};
