import { FC } from 'react';

interface BlogDetailProps {
  title: string;
  author: {
    firstname: string;
    lastname: string;
  };
  publishDate: string;
  content: string;
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
            {`${author.firstname} ${author.lastname}`}, {publishDate}
          </span>
        </div>
      </div>
      <div className='bg-white shadow-sm px-8 py-4 text-primary-text'>
        {content}
      </div>
    </div>
  );
};

export default BlogDetail;
