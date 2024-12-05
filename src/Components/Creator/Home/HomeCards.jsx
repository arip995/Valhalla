import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { ProductTypemapping } from '@/Constants/ProductListingContants';
import axiosInstance from '@/Utils/AxiosInstance';
import {
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconArrowDownRight,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const HomeCards = () => {
  const [data, setData] = useState({}); // State to hold API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.post(
          '/analytics/home'
        );
        setData(data.data); // Assuming the response contains sales, revenue, and product type analytics
      } catch (err) {
        setError('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LayoutLoading overlay />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  // Destructure the fetched data
  const { totalSales, totalRevenue, productTypeDetails } =
    data;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toFixed(2)}`,
      diff: 34,
    }, // Example diff value
    { title: 'Total Sales', value: totalSales, diff: 18 }, // Example diff value
  ];

  const productStats = productTypeDetails.map(product => ({
    title: `${ProductTypemapping[product.productType]} Sales`,
    value: `₹${product.revenue}`,
    diff: 12, // Example diff value for each product
  }));

  const allStats = [...stats, ...productStats];

  const renderedStats = allStats.map(stat => {
    const DiffIcon =
      stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" key={stat.title} radius="md">
        <Group justify="apart">
          <div>
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="xs"
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                stat.diff > 0
                  ? 'var(--mantine-color-teal-6)'
                  : 'var(--mantine-color-red-6)',
            }}
            size={38}
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        {/* <Text c="dimmed" fz="sm" mt="md">
          <Text
            component="span"
            c={stat.diff > 0 ? 'teal' : 'red'}
            fw={700}
          >
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared
          to last month
        </Text> */}
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {renderedStats}
      </SimpleGrid>
    </div>
  );
};

export default HomeCards;
