/* eslint-disable no-unused-vars */
import { Compact } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { Input, rem } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import {
  IconBrandYoutube,
  IconCamera,
} from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useCallback } from 'react';

const CustomTipTapEditor = ({
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
      Image,
      Youtube,
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

  const addImage = useCallback(
    async file => {
      let images = [];
      editor.state.doc.descendants(node => {
        if (node.type.name === 'image') {
          images.push(node.attrs.src);
        }
      });
      const url = await handleFile(file, undefined, 5);
      images.push(url);
      if (!url) return;
      console.log(images);
      images = Compact(images);
      const nodes = images.map(url => ({
        type: 'image',
        src: url,
      }));
      editor.chain().focus().insertContent(nodes).run();

      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor]
  );

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
            {/* <label className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={e => addImage(e.target.files[0])}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }}
              />
              <RichTextEditor.Control
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
            </label> */}
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
            </RichTextEditor.Control>
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

export default CustomTipTapEditor;
