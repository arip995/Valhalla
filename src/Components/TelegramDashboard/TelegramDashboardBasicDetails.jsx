import {
  ActionIcon,
  Button,
  Collapse,
  Input,
  Paper,
  rem,
  Text,
  TextInput,
} from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import { IconCamera } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useCallback } from 'react';

const TelegramDashboardBasicDetails = ({
  data,
  basicDetailsForm,
  onUpdate,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: basicDetailsForm.values.description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      basicDetailsForm.setValues({ description: html });
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <Paper withBorder className="w-full p-4">
      <Text size="md" className="mb-2" fw={600}>
        Basic Details
      </Text>
      <form
        className="flex flex-col gap-3"
        onSubmit={basicDetailsForm.onSubmit(() => {
          onUpdate('details', {
            title: basicDetailsForm.values.title,
            description:
              basicDetailsForm.values.description,
          });
        })}
      >
        <TextInput
          label="Title"
          placeholder="Index + Nifty"
          {...basicDetailsForm.getInputProps('title')}
        />
        <div className="flex flex-col gap-1">
          <Input.Label>About your channel</Input.Label>
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
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className="min-h-32" />
          </RichTextEditor>
        </div>
        <Collapse
          in={
            (basicDetailsForm.values?.title !==
              data?.title ||
              basicDetailsForm.values?.description !==
                data?.description) &&
            !basicDetailsForm.errors.title
          }
        >
          <div className="flex justify-between">
            <Button type="submit" radius="md">
              Publish
            </Button>
          </div>
        </Collapse>
      </form>
    </Paper>
  );
};

export default React.memo(TelegramDashboardBasicDetails);
