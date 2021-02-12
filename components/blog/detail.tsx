import Link from 'components/link';
import { FC } from 'react';
import Dante from 'Dante2';

interface BlogDetailProps {
  title: string;
  author: {
    name: string;
    link: string;
  };
  publishDate: string;
  content: object;
}

const BlogDetail: FC<BlogDetailProps> = ({
  title,
  author,
  publishDate,
  content
}: BlogDetailProps) => {
  return (
    <div>
      <div className='bg-white shadow-sm mb-4 px-8 py-4'>
        <div className='text-2xl text-primary font-semibold mb-2'>
          <span>{title}</span>
        </div>
        <div className='px-2 text-subtitle'>
          <span>
            <Link href={author.link}>{author.name}</Link>, {publishDate}
          </span>
        </div>
      </div>
      <div className='bg-white shadow-sm px-8 py-4'>
        <Dante content={content} read_only={true} />
      </div>
    </div>
  );
};

export default BlogDetail;
