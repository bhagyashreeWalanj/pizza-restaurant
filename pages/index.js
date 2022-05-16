import Head from 'next/head'
import axios from 'axios'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({ pizzaList }) {
  // const pizzaList = [
  //   {
  //     "id": 1,
  //     "img": "/img/pizza.png",
  //     "title": "Italian Pizza",
  //     "prices": [0.29, 0.39, 0.49],
  //     "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa provident nemo non id mollitia cumque consequuntur omnis, quasi doloribus numquam, corporis architecto explicabo, facilis alias harum unde libero aspernatur?"
  //   }
  // ]
  return (
    <div className={styles.container} id="home">
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best Pizza shop in Berlin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://624b52c271e21eebbcf0b4ba.mockapi.io/pizzas/`);

  return {
    props: {
      pizzaList: res.data,
    },
  };
};
