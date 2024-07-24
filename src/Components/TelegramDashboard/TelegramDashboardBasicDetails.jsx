import React from 'react';
import {
  Button,
  Collapse,
  Flex,
  Input,
  Paper,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import '@mantine/tiptap/styles.css';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

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

  return (
    <Paper withBorder className="w-full p-4">
      <Text size="md" className="mb-2" fw={600}>
        Basic details
      </Text>
      <form
        className="flex flex-col gap-3"
        onSubmit={basicDetailsForm.onSubmit(() => {
          onUpdate('title_description', {
            title: basicDetailsForm.values.title,
            description:
              basicDetailsForm.values.description,
          });
        })}
      >
        <TextInput
          label="Title"
          placeholder="Index + Nifty"
          radius="md"
          {...basicDetailsForm.getInputProps('title')}
        />
        <div className="flex flex-col gap-1">
          <Input.Label>Description</Input.Label>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar
              sticky
              stickyOffset={60}
            >
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
          <Button
            fullWidth
            type="submit"
            color="black"
            radius="md"
          >
            Publish
          </Button>
        </Collapse>
      </form>
    </Paper>
  );
};

export default TelegramDashboardBasicDetails;
