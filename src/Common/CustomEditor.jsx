/* eslint-disable no-unused-vars */
import { Input } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useCallback } from 'react';

const CustomEditor = ({
  label,
  className,
  value,
  onUpdate = () => {},
  ...props
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate(html);
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addVideo = useCallback(() => {
    const url = prompt('Enter video URL');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: '100%',
        height: 320,
      });
    }
  }, [editor]);

  // if (!editor) return null;

  return (
    <div
      className={classNames(
        'flex flex-col gap-1',
        className
      )}
      {...props}
    >
      {!!label && <Input.Label>{label}</Input.Label>}
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            {/* <RichTextEditor.Strikethrough /> */}
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
            {/* <RichTextEditor.Control
              onClick={addImage}
              aria-label="Insert image"
              title="Insert image"
            >
              <IconCamera
                style={{
                  width: rem(18),
                  height: rem(18),
                }}
                stroke={1.5}
              />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={addVideo}
              aria-label="Insert video"
              title="Insert video"
            >
              <IconBrandYoutube
                style={{
                  width: rem(18),
                  height: rem(18),
                }}
                stroke={1.5}
              />
            </RichTextEditor.Control> */}
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className="min-h-32" />
      </RichTextEditor>
    </div>
  );
};

export default CustomEditor;
