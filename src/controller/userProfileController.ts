import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileService } from "../factories/makeFactorieUsers";

export default async function Profile(req: FastifyRequest, res: FastifyReply) {
  const id_user = req.user.sub;
  
  const userProfileService = makeGetUserProfileService();

  const userProfile = await userProfileService.GetProfileUserById({ id_user });

  return res.status(200).send({
    user: {
      id_user: userProfile.id_user,
      user_name: userProfile.user_name,
    },
  });
}
