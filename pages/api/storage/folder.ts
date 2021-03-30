import nc from "next-connect";
import { getFiles, createFolder, deleteFile } from "utils/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import { auth } from "utils/firebaseAdmin";

const folderRoute = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(500).end(error);
  },
  onNoMatch(req, res) {
    res.status(405).end(`Method '${req.method}' Not Allowed`);
  },
});

folderRoute.get(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { folderPath } = req.query;

  const path = folderPath ? `${uid}/${folderPath}/` : `${uid}/`;
  const files = await getFiles(path);

  res.status(200).json(files.slice(1));
});

folderRoute.post(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { name, folderPath } = req.body;

  const path = folderPath ? `${uid}/${folderPath}/${name}/` : `${uid}/${name}/`;
  await createFolder(path);

  res.status(200).end();
});

folderRoute.delete(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { path } = req.body;

  await deleteFile(`${uid}/${path}`);

  res.status(200).end();
});

export default folderRoute;
