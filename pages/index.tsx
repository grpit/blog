import { NextPage } from 'next';
import Head from 'next/head';
import BlogCard from 'components/blog/card';

const Blogs = [
  {
    id: 1,
    title: 'Some Great Title',
    author: {
      name: 'Arpit Gupta',
      link: 'https://www.google.com'
    },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, beatae quibusdam? Iste eum facere, numquam adipisci aperiam eaque sit ullam quidem',
    likes: {
      count: 141,
      link: 'https://www.google.com'
    },
    keywords: ['good', 'css', 'html']
  },
  {
    id: 2,
    title: 'Some Great Title',
    author: {
      name: 'Arpit Gupta',
      link: 'https://www.google.com'
    },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, beatae quibusdam? Iste eum facere, numquam adipisci aperiam eaque sit ullam quidem',
    likes: {
      count: 141,
      link: 'https://www.google.com'
    },
    keywords: ['good', 'css', 'html']
  }
];

const Home: NextPage = () => (
  <div>
    <Head>
      <title>gRPIT | Blog</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div>
      {Blogs.map((blog) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  </div>
);

export default Home;
