import Head from 'next/head';
import Image  from 'next/image';
import { SubscribeButton } from '../components/SubscribeButton';

import { GetStaticProps } from 'next'
import { stripe } from '../service/stripe';

import styles from './home.module.scss';

import avatarSvg from '../../public/images/avatar.svg';

interface HomeProps {
  product: {
    priceId:string;
    amount:string;
  }
}



export default function Home({ product } :HomeProps) {
  return (
    <>
      <Head>
        <title>Home - IgNews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
            <span>👏 Hey, Welcome</span>
            <h1>News about <br /> the <span>React</span> world.</h1>
            <p>
              get access to all de publications <br /> 
              <span>for {product.amount} month</span>
             </p>
             <SubscribeButton />
        </section>
        <Image src={avatarSvg} alt="Girl Coding" />
      </main>
   </>
  )
}

export  const getStaticProps: GetStaticProps  = async () => {
  const price = await stripe.prices.retrieve('price_1JJIkwEzlgtsvvYH5sGoLEA0');

  //usar expand ['product'] ou qualquer variável criada para quando quiser usar nome do product ou qualquer outra informação
  
   const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style:'currency',
      currency:'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}