import { FC } from 'react';
import Card from 'components/card';
import Link from 'components/link';

interface BlogCardProps {
  id: number;
  title: string;
  author: {
    name: string;
    link: string;
  };
  description: string;
  likes: {
    count: number;
    link: string;
  };
  keywords: string[];
}

function goTo(link: string, id: number) {
  console.log(link, id); // eslint-disable-line
}

const BlogCard: FC<BlogCardProps> = ({
  id,
  title,
  description,
  author,
  likes,
  keywords
}) => (
  <Card className='mb-8'>
    <div className='mb-4'>
      <Link href={`/blogs/${id}`}>
        <div className='text-4xl text-primary font-semibold mb-2'>{title}</div>
      </Link>
      <div className='flex flex-row'>
        {keywords.map((k, index) => (
          <div
            className='bg-secondary text-white text-xs rounded-full mr-2 px-3 py-1'
            key={index}
          >
            {k}
          </div>
        ))}
      </div>
    </div>
    <div className='text-primary-text px-2'>{description}</div>
    <div className='flex justify-between p-4 items-center'>
      <div onClick={() => goTo(likes.link, id)} className='text-sm '>
        {likes.count}
      </div>
      <div className='text-subtitle'>
        <Link href={author.link}>{author.name}</Link>
      </div>
    </div>
  </Card>
);

export default BlogCard;
