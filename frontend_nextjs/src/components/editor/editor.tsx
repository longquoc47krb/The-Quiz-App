/* eslint-disable react/button-has-type */
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { onBlurred, onFocused } from '@/middlewares/slices/createQuizSlice';

import * as Icons from './icons';

const TextEditor = ({ value, onChange }: { value: string; onChange?: any }) => {
  const dispatch = useDispatch();
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    onFocus({ editor, event }) {
      dispatch(onFocused());
    },
    onBlur({ editor, event }) {
      dispatch(onBlurred());
    },
  });

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);
  if (!editor) {
    return null;
  }
  return (
    <div className="editor">
      <div className="flex items-center justify-start flex-wrap">
        {/* <button
          className="w-fit mr-2 hover:bg-transparent"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="w-fit mr-2 hover:bg-transparent"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button> */}
        <button
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('bold'),
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        {/* <button
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('underline'),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button> */}
        <button
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('intalic'),
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('strike'),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('code'),
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
        <input
          type="color"
          className="w-6"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes('textStyle').color}
          defaultValue="#FF0000"
        />
        <button
          className="w-fit mr-2 hover:bg-transparent text-xs"
          onClick={() => editor.chain().focus().unsetColor().run()}
        >
          Reset Color
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive({ textAlign: 'left' }),
          })}
        >
          <Icons.Left />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive({ textAlign: 'center' }),
          })}
        >
          <Icons.Center />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive({ textAlign: 'right' }),
          })}
        >
          <Icons.Right />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('codeBlock'),
          })}
        >
          <Icons.CodeBlock />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('bulletList'),
          })}
        >
          <Icons.Bullet />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={classNames('w-fit mr-2 hover:bg-transparent', {
            'text-primary-500': editor.isActive('orderedList'),
          })}
        >
          <Icons.Ordered />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="border border-gray-600 rounded-sm px-4 py-4 outline-none focus-within:border-primary-500 text-gray-200"
      />
    </div>
  );
};

export default TextEditor;
