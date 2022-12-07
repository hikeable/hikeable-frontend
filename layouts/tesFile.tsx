export {}

// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { ReactElement } from 'react';
// import Layout from '../layout/layout'
// import { Data, post } from './api/api';

// export default function Template2({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     return (
//         <>
//             {data.post.map((post: post) => {
//                 return <p>{post.title}</p>
//             })}
//         </>
//     )
// }
// export const getServerSideProps: GetServerSideProps = async () => {
//     const res = await fetch(`http://localhost:3000/api/api`)
//     const data = await res.json()
//     return { props: { data: data } }
// }

// Template2.getLayout = function getLayout(data: Data, component: ReactElement) {
//     return (
//         <Layout data={data}>
//             {component}
//         </Layout>
//     )
// }