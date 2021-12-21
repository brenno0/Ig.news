import { render, screen } from '@testing-library/react'
import { stripe } from '../../service/stripe'
import  { mocked } from 'ts-jest/utils'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../service/prismic'
import { getSession } from 'next-auth/client'

const post = {
    slug:'my-new-post',
    title:'My New Post',
    content:'<p>Post excerpt</p>',
    updatedAt:'10 de Abril',
}
jest.mock('next-auth/client');

jest.mock('../../service/prismic.ts')
describe('Post Page', () => {
    it('renders correctly' , () => {
        render(<Post post={post}  />)

        expect(screen.getByText("My New Post")).toBeInTheDocument()
        expect(screen.getByText("Post excerpt")).toBeInTheDocument()
    })
    it('redirects if no user subscription is found' , async () => {
        const getSessionMocked = mocked(getSession);

        getSessionMocked.mockResolvedValueOnce(null)

        const response = await getServerSideProps(
            {params: { slug:'my-new-post' }
        } as any)
        expect(response).toEqual(
            expect.objectContaining({
                redirect:expect.objectContaining({
                    destination:'/',
                })
            })
        )
    }) 
    it('loads initial data', async () => {
        const getSessionMocked = mocked(getSession);
        const getPrismicClientMocked = mocked(getPrismicClient)
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID:jest.fn().mockResolvedValueOnce({
                data:{
                    title:[
                        {type:'heading', text:'My New Post'}
                    ],
                    content:[
                        {type:'paragraph', text:'Post content'}
                    ],
                },
                last_publication_date:'04-01-2021',
            } )
        }as any)
        getSessionMocked.mockResolvedValueOnce({
            activeSubscription:'fake-active-subscription'
        } as any)
        const response = await getServerSideProps(
            {params: { slug:'my-new-post' }
        } as any)
        expect(response).toEqual(
            expect.objectContaining({
               props:{
                   post:{
                       slug:'my-new-post',
                       title:'My New Post',
                       content:'<p>Post content</p>',
                       updatedAt:'01 de abril de 2021'

                   }
               }
            })
        )

    })
})