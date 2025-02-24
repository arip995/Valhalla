import { Switch, TextInput } from '@mantine/core';

const Tracking = ({ form }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Tracking Configuration
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>Enable Meta Pixel Tracking</div>
            <Switch
              checked={form.values.isMetaTrackingEnabled}
              onChange={event => {
                form.setFieldValue(
                  'isMetaTrackingEnabled',
                  event.currentTarget.checked
                );
              }}
            />
          </div>
          {form.values.isMetaTrackingEnabled && (
            <TextInput
              placeholder="Enter Meta Pixel ID"
              value={form.values.metaPixelId || ''}
              onChange={event => {
                form.setFieldValue(
                  'metaPixelId',
                  event.currentTarget.value
                );
              }}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div> Enable Google Analytics Tracking</div>
            <Switch
              checked={
                form.values.isGoogleAnalyticsTrackingEnabled
              }
              onChange={event => {
                form.setFieldValue(
                  'isGoogleAnalyticsTrackingEnabled',
                  event.currentTarget.checked
                );
              }}
            />
          </div>

          {form.values.isGoogleAnalyticsTrackingEnabled && (
            <TextInput
              placeholder="Enter Google Analytics Measurement ID"
              value={form.values.googleAnalyticsId || ''}
              onChange={event => {
                form.setFieldValue(
                  'googleAnalyticsId',
                  event.currentTarget.value
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
