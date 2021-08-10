import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { getPrismicClient } from '../../service/prismic'
import styles from './styles.module.scss'
import Prismic from '@prismicio/client'

export default function Posts(){
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>    
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>10 de Agosto de 2021</time>
                        <strong>Como renomear vários arquivos de uma vez usando o terminal</strong>
                        <p>Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. </p>
                    </a>
                    <a href="">
                        <time>10 de Agosto de 2021</time>
                        <strong>Como renomear vários arquivos de uma vez usando o terminal</strong>
                        <p>Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. </p>
                    </a>
                    <a href="">
                        <time>10 de Agosto de 2021</time>
                        <strong>Como renomear vários arquivos de uma vez usando o terminal</strong>
                        <p>Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. </p>
                    </a>
                </div>
                
            </main>
        </>
    );

}

export const getStaticProps:GetStaticProps = async () =>{
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type','publication')
    ],{
        fetch: ['publication.title','publication.content'],
        pageSize:100
    })
    return {
        props:{}
    }

}

