import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import  {query as q} from 'faunadb'
import { signIn } from 'next-auth/client'
import { fauna } from '../../../service/fauna'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_KEY,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope:'read:user'
    }),
],
  callbacks: {
    async signIn(user,account,profile){
      try{

        const {email} = user
        await fauna.query( // Inserção no banco de dados do fauna 
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: { email }}
            ),
            q.Get( //Select
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
       
        )
        return true;
      }catch{
        return false;
      }
    }
  }
})



