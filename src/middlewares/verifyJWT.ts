import { FastifyReply, FastifyRequest } from "fastify";

async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
	try{
		await req.jwtVerify()
	} catch(error){
		return res.status(401).send({message: 'Unauthorized'})
	}
}

export const auth = { onRequest: [verifyJWT] };