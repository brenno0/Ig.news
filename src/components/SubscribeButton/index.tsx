import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { api } from '../../service/api';
import { getStripeJs } from '../../service/stripe-js';
import styles from './styles.module.scss';
interface SubscribeButtonProps {
    priceId:string;
}

export  function SubscribeButton({priceId} : SubscribeButtonProps) {

    const [session] = useSession();
    const router = useRouter();

    async  function handleOnSubscribe() {

       
        
        if(!session){
            signIn('github');
            return;
        }
        if(session.activeSubscription){
            router.push('/posts');
            return;
        }
       try{
        const response = await  api.post('/subscribe');

        const { sessionId } = response.data

        const stripe = await getStripeJs();

        await stripe.redirectToCheckout({ sessionId })
        
       }catch(err){
           alert(err.message);
       }
    }

    return(
        <button 
        type="button" 
        className={styles.subscribeButton}
        onClick={handleOnSubscribe}
        >
            Subscribe now
        </button>
    )
}