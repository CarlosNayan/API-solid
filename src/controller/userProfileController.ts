import { FastifyReply, FastifyRequest } from "fastify";

export default async function Profile(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify();

  const id_user = req.user.sub

  return res.status(200).send();
}
