import { useState, useEffect, ChangeEvent, FC } from 'react';
import Dante from 'Dante2';
import useDebouce from 'utils/useDebounce';
import PrimaryButton from 'components/button/primary';
import AuthGuard from 'utils/authGuard';

const CreatePost: FC = () => {
  const [title, setTitle] = useState(String);
  // Todo: Get content from server side props and use it as default for content
  const [content, setContent] = useState('');
  const debouncedTitle = useDebouce(title, 1500);

  // const createDraftHash = () => {
  // Todo: Create draft hash and append it as query param, this will then be used to reference the draft and load draft data.
  // };

  const saveDraftTitle = () => {
    // Todo: Implement save call to save draft title
    // console.log(title)
  };

  const saveDraftContent = (editorContext: any, draftContent: any) => {
    // Todo: Implement call to save draft content.
    // elsint-disable-next-line
    console.log(draftContent);
  };

  const publishDraft = () => {
    // Todo: Implement method to publish the saved draft
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
          data_storage={{
            success_handler: () => {},
            failure_handler: () => {},
            url: `/draft/123`,
            method: 'POST',
            interval: 1500,
            save_handler: saveDraftContent,
            withCredentials: false,
            crossDomain: false,
            headers: {}
          }}
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
