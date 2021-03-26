import nc from "next-connect";
import { getFiles, uploadFile } from "utils/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import { auth } from "utils/firebaseAdmin";

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { prefix = [] } = req.query as { prefix: string[] };

  //get a root folder or a folder inside of it
  const path = prefix.length ? `${uid}/${prefix.join("/")}/` : `${uid}/`;
  const files = await getFiles(path);

  res.status(200).json(files.slice(1));
});

apiRoute.post(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { prefix = [] } = req.query as { prefix: string[] };
  const { folderName } = req.body;
  prefix.push(folderName);

  const path = `${uid}/${prefix.join("/")}/`;
  await uploadFile("", path);

  res.status(200).json(`Folder has been created`);
});

export default apiRoute;
