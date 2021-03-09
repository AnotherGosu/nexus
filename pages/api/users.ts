import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const usersPath = path.join(process.cwd(), "users.json");

export default (req: NextApiRequest, res: NextApiResponse) => {
  const isSignedUp = signUp(req.body.email, req.body.password);
  if (isSignedUp) {
    res.status(200).json(isSignedUp);
  } else {
    res.status(403).json(isSignedUp);
  }
};

function signUp(email: string, password: string) {
  const data = fs.readFileSync(usersPath, "utf-8");
  const users = JSON.parse(data);

  if (email in users) return false;

  users[email] = password;
  const updatedData = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersPath, updatedData);
  return true;
}
