import { FC } from 'react';
import Card from 'components/card';
import Link from 'next/link';

type Props = {
  id: number;
  title: string;
  author: {
    name: string;
    link: string;
  };
  likes: {
    count: number;
    link: string;
  };
  keywords: string[];
};

function goTo(link: string, id: number) {
  console.log(link, id);
}

const BlogCard: FC<Props> = ({ id, title, author, likes, keywords }) => (
  <Card>
    <div className='mb-8'>
      <div className='text-4xl font-semibold mb-2'>{title}</div>
      <div className='flex flex-row'>
        {keywords.map((k, index) => (
          <div
            className='bg-purple-500 text-white text-xs rounded-full mr-2 px-3 py-1'
            key={index}
          >
            {k}
          </div>
        ))}
      </div>
    </div>
    <div className='flex justify-between p-4 items-center'>
      <div
        onClick={() => goTo(likes.link, id)}
        className='text-sm text-purple-500'
      >
        {likes.count}
      </div>
      <div className='font-semibold text-gray-700'>
        <Link href={author.link}>{author.name}</Link>
      </div>
    </div>
  </Card>
);

export default BlogCard;
