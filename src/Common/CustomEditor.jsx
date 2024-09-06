import { ActionIcon, Input, rem } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import {
  IconBrandYoutube,
  IconCamera,
} from '@tabler/icons-react';
import classNames from 'classnames';
import { useCallback } from 'react';

const CustomEditor = ({ editor, label, className }) => {
  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutubeVideo = useCallback(() => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: '100%',
        height: 320,
      });
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      className={classNames(
        'flex flex-col gap-1',
        className
      )}
    >
      {!!label && <Input.Label>{label}</Input.Label>}
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
          <div className="h-[26px] w-[26px]">
            <ActionIcon
              variant="default"
              size="sm"
              style={{
                height: 'inherit',
                width: 'inherit',
              }}
              onClick={addImage}
            >
              <IconCamera
                style={{
                  width: rem(18),
                  height: rem(18),
                }}
                stroke={1.5}
              />
            </ActionIcon>
          </div>
          <div className="h-[26px] w-[26px]">
            <ActionIcon
              variant="default"
              size="sm"
              style={{
                height: 'inherit',
                width: 'inherit',
              }}
              onClick={addYoutubeVideo}
            >
              <IconBrandYoutube
                style={{
                  width: rem(18),
                  height: rem(18),
                }}
                stroke={1.5}
              />
            </ActionIcon>
          </div>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className="min-h-32" />
      </RichTextEditor>
    </div>
  );
};

export default CustomEditor;
