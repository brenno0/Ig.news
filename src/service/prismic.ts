import Prismic from '@prismicio/client'
import { access } from 'fs'

export function getPrismicClient(req?:unknown){
 const prismic = Prismic.client(
    process.env.PRISMIC_ADRESS_ENDPOINT,
 )
 {
     acessToken: process.env.PRISMIC_ACCESS_TOKEN,
     req
 }
 return prismic;    
  }
