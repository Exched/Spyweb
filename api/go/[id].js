
import { links } from '../redirect';

export default async function handler(req, res) {
  const {
    query: { id },
    headers,
  } = req;

  const record = links.get(id);
  if (!record) {
    res.status(404).send("Link not found");
    return;
  }

  const log = {
    time: new Date().toISOString(),
    ip: headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: headers["user-agent"],
  };

  try {
    const geo = await fetch("https://ipapi.co/json").then((res) => res.json());
    log.location = geo;
  } catch (e) {
    log.location = null;
  }

  record.logs.push(log);
  res.writeHead(302, { Location: record.target });
  res.end();
}
