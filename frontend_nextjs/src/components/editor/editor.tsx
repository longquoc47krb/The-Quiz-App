import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import type { EditorProps } from 'draft-js';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

const TextEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState) => {
    const htmlString = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );

    setEditorState(editorState);
    onChange(htmlString); // Pass the HTML content back using the onChange prop
  };
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="border border-gray-200 rounded-sm p-2"
      editorClassName="border border-gray-200 rounded-md px-2 leading-4 editor-container"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'fontFamily',
          'list',
          'textAlign',
          'colorPicker',
          'embedded',
          'remove',
          'history',
        ],
        inline: { inDropdown: true },
        blockType: { inDropdown: true },
        fontSize: { inDropdown: true },
        fontFamily: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        colorPicker: { inDropdown: true },
        embedded: { inDropdown: true },
        remove: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
    // <div className='leading-4'/>
  );
};

export default TextEditor;
