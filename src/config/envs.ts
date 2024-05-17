import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  JWT_SEED: get('JWT_SEED').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  POSTGRES_URL: get('POSTGRES_URL').default('public').asString(),

}


