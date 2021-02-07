import BlogDetail from 'components/blog/detail';
import { FC } from 'react';

const defaultBlog = {
  title: 'This is how to write a smple Blog',
  author: {
    name: 'Arpit Gupta',
    link: 'https://google.com'
  },
  publishDate: '20 Jan 2020',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, cupiditate ipsum, enim nostrum numquam iusto repellat eius molestiae commodi quae veniam suscipit harum itaque eum, dicta maiores necessitatibus rem tenetur?'
};

const BlogPage: FC = () => {
  return (
    <div id='blog-detail-container'>
      <BlogDetail {...defaultBlog} />
    </div>
  );
};

export default BlogPage;
