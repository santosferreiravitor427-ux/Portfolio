import {env} from 'cloudflare:workers';
export function progressDb(){if(!env.DB)throw new Error('Armazenamento indisponível');return env.DB;}
