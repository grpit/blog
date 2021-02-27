import { useState, useEffect, ChangeEvent, FC } from 'react';
import Dante from 'Dante2';
import { useRouter } from 'next/router';

import useDebouce from 'utils/useDebounce';
import PrimaryButton from 'components/button/primary';
import AuthGuard from 'utils/authGuard';
import axios from 'utils/axios';
import generateHash from 'utils/generateHash';
import getQueryParams from 'utils/getQuery';

const CreatePost: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  // Todo: Get content from server side props and use it as default for content
  const [content, setContent] = useState<any>('');
  const debouncedTitle = useDebouce(title, 1500);
  const debouncedContent = useDebouce(content, 1500);

  const router = useRouter();

  const getOrCreateDraftHash = async () => {
    try {
      let { ___genpath: draftHash } = getQueryParams();
      if (!draftHash) {
        // Todo: pass username to generate hash
        draftHash = generateHash('').toString();
        await axios.post(`/draft/?hash=${draftHash}`);
      }
      setHash(draftHash);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const saveDraftTitle = async () => {
    if (title) {
      try {
        await axios.put(`/draft/${hash}/`, {
          title
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return true;
  };

  const saveDraftContent = async () => {
    if (content?.blocks?.length && title) {
      try {
        await axios.put(`/draft/${hash}/`, {
          title,
          content
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return true;
  };

  const publishDraft = async () => {
    try {
      await saveDraftContent();
      await axios.post(`/draft/publish/?hash=${hash}`);
    } catch (error) {
      console.error(error);
      return false;
    }
    return router.push('/');
  };

  const setTitleWithLimit = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle: string = event.target.value;
    if (title.length < 50) {
      setTitle(newTitle);
    }
  };

  const setDraftContent = (editor: any) => {
    const draftContent = editor.emitSerializedOutput();
    setContent(draftContent);
  };

  useEffect(() => {
    saveDraftTitle();
  }, [debouncedTitle]);

  useEffect(() => {
    getOrCreateDraftHash();
  }, []);

  useEffect(() => {
    saveDraftContent();
  }, [debouncedContent]);

  return (
    <div>
      <div className='min-h-full bg-white min-w-full te'>
        <div className='bg-white shadow-sm mb-4 px-8 py-4'>
          <input
            type='text'
            className='text-2xl text-primary font-semibold mb-2 focus:outline-none w-full'
            placeholder='Post Title'
            onChange={setTitleWithLimit}
            value={title}
          />
        </div>
      </div>
      <div className='bg-white shadow-sm px-8 py-4 text-primary-text'>
        <Dante
          body_placeholder={'Post Content'}
          content={content}
          default_wrappers={[
            { className: 'text-primary-text', block: 'unstyled' },
            { className: 'text-primary-text text-4xl', block: 'header-one' },
            { className: 'text-primary-text text-2xl', block: 'header-two' },
            { className: 'text-primary-text text-xl', block: 'header-three' },
            {
              className: 'text-primary-text graf--blockquote ',
              block: 'blockquote'
            },
            {
              className: 'text-primary-text graf--insertunorderedlist',
              block: 'unordered-list-item'
            },
            {
              className: 'text-primary-text graf--insertorderedlist',
              block: 'ordered-list-item'
            },
            { className: 'graf--code', block: 'code-block' },
            { className: 'text-primary-text graf--bold', block: 'BOLD' },
            { className: 'text-primary-text graf--italic', block: 'ITALIC' }
          ]}
          onChange={setDraftContent}
        />
      </div>
      <div className='mt-4 text-right'>
        <PrimaryButton onClick={publishDraft} className='mr-2'>
          Publish
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CreatePost;

export const getServerSideProps = AuthGuard;
