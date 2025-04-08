
import { links } from './redirect';

export default async function handler(req, res) {
  const { id } = req.query;

  if (links.has(id)) {
    res.status(200).json(links.get(id));
  } else {
    res.status(404).json({ error: "ID tidak ditemukan" });
  }
}
