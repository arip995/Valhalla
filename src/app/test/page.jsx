'use client';

import React from 'react';

import {
  ActionIcon,
  Button,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import axiosInstance from '@/Utils/AxiosInstance';
import { IconTrash } from '@tabler/icons-react';

const test = () => {
  const form = useForm({
    initialValues: {
      channelName: '',
      adminName: '',
    },
  });

  const [channels, setChannels] = React.useState([]);

  const handleSubmit = async values => {
    try {
      await axiosInstance.post(`/channel/add`, {
        channelName: values.channelName,
        adminName: values.adminName,
      });
      form.reset();
      console.log('Channel added successfully');
      fetchChannels();
    } catch (error) {
      console.error('Failed to add channel:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await axiosInstance.get(
        `/channel/get_all`
      );
      console.log('Channels:', response.data);
      setChannels(response.data.data);
    } catch (error) {
      console.error('Failed to fetch channels:', error);
    }
  };

  const handleDelete = async channelId => {
    try {
      await axiosInstance.delete(
        `/channel/delete/${channelId}`
      );
      console.log('Channel deleted successfully');
      fetchChannels();
    } catch (error) {
      console.error('Failed to delete channel:', error);
    }
  };

  React.useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <div className="flex h-full w-full justify-center p-4">
      <div className="w-full max-w-2xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            maxLength={40}
            required
            label="Channel Name"
            placeholder="Enter channel name"
            {...form.getInputProps('channelName')}
          />
          <TextInput
            maxLength={40}
            required
            label="Admin Name"
            placeholder="Enter admin name"
            {...form.getInputProps('adminName')}
          />
          <Button type="submit" fullWidth mt="md">
            Submit
          </Button>
        </form>
        <div className="my-6 rounded bg-white shadow-md">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                <th className="px-6 py-3 text-left">
                  Channel Name
                </th>
                <th className="px-6 py-3 text-left">
                  Admin Name
                </th>
                <th className="px-6 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            {channels?.length ? (
              <tbody className="text-sm font-light text-gray-600">
                {channels.map((channel, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="whitespace-nowrap px-6 py-3 text-left">
                      {channel.channelName}
                    </td>
                    <td className="px-6 py-3 text-left">
                      {channel.adminName}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <ActionIcon
                        variant="subtle"
                        onClick={() =>
                          handleDelete(channel._id)
                        }
                        color="red"
                        size="sm"
                      >
                        <IconTrash />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-3 text-center"
                  >
                    No channels available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default test;
