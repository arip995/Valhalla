import {
  ActionIcon,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconBrush,
  IconDownload,
  IconMoon,
  IconSun,
  IconTicket,
} from '@tabler/icons-react';

// Direct imports instead of dynamic imports
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';

// Predefined gradient backgrounds
const gradients = [
  'linear-gradient(135deg, #0061ff 0%, #60efff 100%)',
  'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
  'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
  'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
  'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
  'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
  'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
  'linear-gradient(135deg, #5f72bd 0%, #9b23ea 100%)',
];

// Dark mode gradient overlays - made more visible
const darkGradientOverlays = [
  'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
  'linear-gradient(45deg, rgba(20,20,35,0.5) 0%, rgba(0,0,0,0.3) 100%)',
  'linear-gradient(45deg, rgba(30,0,40,0.4) 0%, rgba(0,0,0,0.2) 100%)',
  'linear-gradient(45deg, rgba(40,0,0,0.3) 0%, rgba(0,0,0,0.2) 100%)',
];

const CouponTicket = ({ coupon, opened, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [gradient, setGradient] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [darkOverlay, setDarkOverlay] = useState(0);
  const ticketRef = useRef(null);
  const containerRef = useRef(null);
  const fullContainerRef = useRef(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    // When in dark mode, randomize the dark overlay when gradient changes
    if (darkMode) {
      const newOverlay = Math.floor(
        Math.random() * darkGradientOverlays.length
      );
      setDarkOverlay(newOverlay);
    }
  }, [gradient, darkMode]);

  if (!coupon || !coupon?.code) return null;

  const formatDiscount = () => {
    if (coupon.discountType === 1) {
      return `${coupon.discountValue}% OFF`;
    } else if (coupon.discountType === 2) {
      return `₹${coupon.discountValue} OFF`;
    }
    return '';
  };

  const productUrl = `${process.env.NEXT_PUBLIC_HOST}/${coupon.productType || 'tg'}/${coupon.product?._id || coupon.productId}`;

  const formatDate = dateString => {
    if (!dateString) return 'No expiry';

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      // Array of month names
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      // Get date components
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } catch (e) {
      return 'Invalid date';
    }
  };

  const handleChangeGradient = () => {
    const nextGradient = (gradient + 1) % gradients.length;
    setGradient(nextGradient);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const prepareForDownload = async () => {
    // Hide the theme toggle button and color picker before capturing
    const themeToggle =
      ticketRef.current.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.style.display = 'none';
    }

    // Hide the color picker button
    if (colorPickerRef.current) {
      colorPickerRef.current.style.visibility = 'hidden';
      colorPickerRef.current.style.opacity = '0';
    }
  };

  const resetAfterDownload = () => {
    // Show the theme toggle button and color picker again
    const themeToggle =
      ticketRef.current.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.style.display = 'flex';
    }

    // Show the color picker button again
    if (colorPickerRef.current) {
      colorPickerRef.current.style.visibility = 'visible';
      colorPickerRef.current.style.opacity = '1';
    }
  };

  // Alternative download approach using DOM elements
  const downloadAsImage = () => {
    const element = fullContainerRef.current;
    if (!element) return;

    // Hide UI elements for screenshot
    prepareForDownload();

    // Convert the ticket to an image using html2canvas
    html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 2,
      logging: true,
    })
      .then(canvas => {
        // Double-check if canvas is valid
        if (!canvas) {
          throw new Error('Canvas creation failed');
        }

        try {
          // Try to convert to data URL
          const dataUrl = canvas.toDataURL('image/png');

          // Create a download link
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${coupon.code}-coupon-ticket.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          showNotification({
            title: 'Success',
            message:
              'Coupon ticket downloaded successfully',
            color: 'green',
          });
        } catch (e) {
          console.error('toDataURL error:', e);
          // Alternative approach using blob
          try {
            canvas.toBlob(blob => {
              if (!blob)
                throw new Error('Blob creation failed');

              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${coupon.code}-coupon-ticket.png`;
              document.body.appendChild(link);
              link.click();
              URL.revokeObjectURL(url);
              document.body.removeChild(link);

              showNotification({
                title: 'Success',
                message:
                  'Coupon ticket downloaded successfully',
                color: 'green',
              });
            }, 'image/png');
          } catch (blobError) {
            console.error('Blob error:', blobError);
            throw blobError;
          }
        }
      })
      .catch(error => {
        console.error('Download error:', error);
        showNotification({
          title: 'Error',
          message:
            'Failed to download coupon ticket: ' +
            error.message,
          color: 'red',
        });
      })
      .finally(() => {
        resetAfterDownload();
        setDownloading(false);
      });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      downloadAsImage();
    } catch (error) {
      console.error(
        'Error starting download process:',
        error
      );
      resetAfterDownload();
      setDownloading(false);
      showNotification({
        title: 'Error',
        message: 'Failed to start download process',
        color: 'red',
      });
    }
  };

  // Dark mode color palette
  const darkPalette = {
    background: '#1A1B1E',
    paper: '#25262b',
    header: '#25262b',
    text: '#c1c2c5',
    border: '#373A40',
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Coupon Ticket"
      size="lg"
      centered
      styles={{
        title: {
          fontWeight: 700,
          fontSize: '18px',
        },
      }}
    >
      <div className="relative m-4">
        <LoadingOverlay
          visible={downloading}
          overlayBlur={2}
        />

        {/* Full container including background and ticket */}
        <div
          ref={fullContainerRef}
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            ref={containerRef}
            className="!py-8"
            style={{
              background: gradients[gradient],
              padding: '15px',
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
            }}
          >
            {/* Overlay for dark mode - more visible now */}
            {darkMode && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    darkGradientOverlays[darkOverlay],
                  zIndex: 1,
                  opacity: 0.7, // Increased opacity
                }}
              />
            )}

            {/* Nexify Branding */}
            <div
              className="relative z-10 !mb-2 flex items-center justify-between"
              style={{
                width: '100%',
                maxWidth: '350px',
                margin: 'auto',
                zIndex: 2,
              }}
            >
              <Text
                fw={800}
                size="xl"
                style={{
                  color: 'white',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  marginLeft: '4px',
                }}
              >
                Nexify
              </Text>
              <div
                ref={colorPickerRef}
                className="overflow-hidden rounded-full"
                style={{
                  background:
                    gradients[
                      (gradient + 2) % gradients.length
                    ],
                  padding: '1px',
                  boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                }}
              >
                <ActionIcon
                  onClick={handleChangeGradient}
                  title="Change Background"
                  radius="xl"
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <IconBrush size={14} stroke={1.5} />
                </ActionIcon>
              </div>
            </div>

            <Paper
              ref={ticketRef}
              id="coupon-ticket"
              shadow="sm"
              p={0}
              style={{
                width: '100%',
                maxWidth: '350px',
                margin: '0 auto',
                background: darkMode
                  ? darkPalette.background
                  : 'white',
                border: darkMode
                  ? `1px solid ${darkPalette.border}`
                  : '1px solid #e9ecef',
                position: 'relative',
                zIndex: 2,
                overflow: 'hidden',
              }}
              className="relative"
              withBorder
            >
              {/* Ticket Header */}
              <Box
                p="xs"
                style={{
                  background: darkMode
                    ? darkPalette.header
                    : gradients[gradient],
                  color: 'white',
                  borderBottom: darkMode
                    ? `1px solid ${darkPalette.border}`
                    : 'none',
                }}
              >
                <Group position="apart" spacing="xs" noWrap>
                  <div>
                    <Text size="xs" weight={500}>
                      {coupon.product?.title || 'Product'}
                    </Text>
                    <Text size="md" weight={700}>
                      {formatDiscount()}
                    </Text>
                  </div>
                  <IconTicket size={24} />
                </Group>
              </Box>

              {/* Ticket Content */}
              <Box py="xs" px="sm" className="relative">
                <SimpleGrid cols={2} spacing="sm">
                  {/* Left column with coupon details */}
                  <Stack spacing="xs">
                    <div>
                      <Text
                        size="xs"
                        color={
                          darkMode ? 'dimmed' : 'gray.6'
                        }
                      >
                        USE CODE
                      </Text>
                      <Text
                        size="md"
                        fw={700}
                        className="font-mono"
                        color={darkMode ? 'white' : 'dark'}
                        style={{
                          letterSpacing: '0.5px',
                        }}
                      >
                        {coupon.code}
                      </Text>
                    </div>

                    {!!coupon.validFrom && (
                      <div>
                        <Text
                          size="xs"
                          color={
                            darkMode ? 'dimmed' : 'gray.6'
                          }
                        >
                          VALID UNTIL
                        </Text>
                        <Text
                          size="xs"
                          color={
                            darkMode
                              ? darkPalette.text
                              : 'dark'
                          }
                        >
                          {formatDate(coupon.validUntil)}
                        </Text>
                      </div>
                    )}
                  </Stack>

                  {/* Right column with QR code */}
                  <Box className="flex flex-col items-center justify-center">
                    <Paper
                      p="xs"
                      className="flex flex-col items-center justify-center"
                      style={{
                        background: darkMode
                          ? darkPalette.paper
                          : 'white',
                        border: darkMode
                          ? `1px solid ${darkPalette.border}`
                          : '1px solid #e9ecef',
                        boxShadow: darkMode
                          ? '0 4px 8px rgba(0,0,0,0.3)'
                          : '0 2px 5px rgba(0,0,0,0.05)',
                      }}
                      withBorder
                    >
                      <QRCodeSVG
                        value={productUrl}
                        size={90}
                        level="H"
                        includeMargin={true}
                        bgColor={
                          darkMode
                            ? darkPalette.paper
                            : '#ffffff'
                        }
                        fgColor={
                          darkMode ? '#ffffff' : '#000000'
                        }
                      />
                      <Text
                        size="10px"
                        align="center"
                        color={
                          darkMode ? 'dimmed' : 'gray.7'
                        }
                      >
                        Scan to redeem
                      </Text>
                    </Paper>
                  </Box>
                </SimpleGrid>

                {/* Theme toggle - hidden during download */}
                <div className="theme-toggle mt-2 flex justify-center">
                  <ActionIcon
                    variant="subtle"
                    color={darkMode ? 'yellow' : 'blue'}
                    onClick={toggleTheme}
                    title={
                      darkMode
                        ? 'Switch to Light Mode'
                        : 'Switch to Dark Mode'
                    }
                    radius="xl"
                    size="sm"
                  >
                    {darkMode ? (
                      <IconSun size={14} />
                    ) : (
                      <IconMoon size={14} />
                    )}
                  </ActionIcon>
                </div>
              </Box>
            </Paper>
          </div>
        </div>

        <Group position="center" mt="xs" spacing="xs">
          <Button
            onClick={handleDownload}
            leftSection={<IconDownload size={14} />}
            loading={downloading}
            disabled={downloading}
            size="xs"
            gradient={{ from: 'indigo', to: 'cyan' }}
            variant={darkMode ? 'gradient' : 'filled'}
            compact
          >
            Download
          </Button>
        </Group>
      </div>
    </Modal>
  );
};

export default CouponTicket;
