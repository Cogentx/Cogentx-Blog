//TODO: factor out Firebase

import { FormEventHandler } from 'react';

/** Admin component to create new post
 *
 * @returns JSX.Element
 */
export default function CreateNewPost() {
  const createPost: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Create New Post form submitted');
  };

  return <form onSubmit={createPost}></form>;
}
