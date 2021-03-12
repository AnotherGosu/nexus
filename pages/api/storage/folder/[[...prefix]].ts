import nc from "next-connect";
import { createFolder, getFiles, getRecentFiles } from "utils/storage";
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
  const { type = "all" } = req.query as {
    type: "all" | "recent";
  };

  let files = [];

  switch (type) {
    case "all": {
      //get a root folder or a folder inside of it
      const path = prefix.length ? `${uid}/${prefix.join("/")}/` : `${uid}/`;
      files = await getFiles(path);
      break;
    }
    case "recent": {
      const path = `${uid}/`;
      files = await getRecentFiles(path);
      break;
    }
  }

  res.status(200).json(files.slice(1));
});

apiRoute.post(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { prefix = [] } = req.query as { prefix: string[] };

  const path = `${uid}/${prefix.join("/")}/`;
  await createFolder(path);

  res.status(200).json(`Folder has been created`);
});

export default apiRoute;
