import BlogDetail from 'components/blog/detail';
import { FC } from 'react';

const defaultBlog = {
  title: 'This is how to write a smple Blog',
  author: {
    name: 'Arpit Gupta',
    link: 'https://google.com'
  },
  publishDate: '20 Jan 2020',
  content: {
    blocks: [
      {
        key: 'cec3i',
        text: 'asdsaxZ',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: 'hvmr',
        text: ' This is a good Example',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: '8s2bv',
        text: 'asasas Come on this is good',
        type: 'blockquote',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: 'elf52',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: 'ep0lp',
        text: 'console.log',
        type: 'code-block',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  }
};

const BlogPage: FC = () => {
  return (
    <div id='blog-detail-container'>
      <BlogDetail {...defaultBlog} />
    </div>
  );
};

export default BlogPage;
