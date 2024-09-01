import CustomEditor from '@/Common/CustomEditor';
import {
  Button,
  Collapse,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';
import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

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
      Youtube,
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
        <CustomEditor
          label="About your channel"
          editor={editor}
        />
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
