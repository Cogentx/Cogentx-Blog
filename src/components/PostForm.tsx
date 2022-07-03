import { DocumentReference } from 'firebase/firestore';
import { useForm, useWatch } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import type { IPost } from '../@interfaces/IBlogPosts';

interface IProps {
  defaultValues: any;
  postRef: DocumentReference;
  preview: boolean;
}

type IWatchFormValues = {
  content: string;
};

export default function PostForm({ defaultValues, postRef, preview }: IProps) {
  const { register, clearErrors, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty } = formState;

  const updatePost = async () => {
    try {
      console.log('updating post');
    } catch (error) {
      // TODO: handle error properly
      console.log('PostForm', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="p-8 my-8 mx-0 bg-white border border-cx-dark-3 rounded-lg">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? 'hidden' : 'flex flex-col'}>
        <textarea className="h-[60vh] border-none outline-none p-2 text-lg" {...register('content')}></textarea>
      </div>

    </form>
  );
}
