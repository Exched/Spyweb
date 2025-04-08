
let links = new Map();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { target } = req.body;
    const id = Math.random().toString(36).substring(2, 8);
    links.set(id, { target, logs: [] });
    res.status(200).json({ id, url: `/api/go/${id}` });
  } else {
    res.status(405).end();
  }
}

export { links };
