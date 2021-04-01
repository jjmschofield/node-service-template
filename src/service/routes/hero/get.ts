import {Context} from "koa";
import {getHero} from "../../lib/hero";
import Joi from "joi";

interface ValidRequest {
  params: { id: string },
  valid: boolean,
}

export const getCtrl = async (ctx: Context, next: Function) => {
  const req = getValidatedReq(ctx);

  if (!req.valid) {
    ctx.status = 400;
    return;
  }

  const hero = await getHero(req.params.id);

  if(!hero){
    ctx.status = 404;
    return;
  }

  ctx.status = 200;
  ctx.body = { hero };
};

const getValidatedReq = (ctx: Context): ValidRequest => {
  const req = {
    params: {id: ctx.params.id}
  }

  const schema = Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
  });

  const validation = schema.validate(req);

  return {...req, valid: !!validation.error};
}
