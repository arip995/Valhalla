import { revalidatePath } from 'next/cache';

export default async function revalidate(req, res) {
  const { path } = req.query;

  if (!path) {
    return res
      .status(400)
      .json({ error: 'Path is required' });
  }

  try {
    await revalidatePath(path);
    return res
      .status(200)
      .json({ message: 'Path revalidated' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error revalidating path' });
  }
}

// const fetch = require('node-fetch');

// const revalidatePath = async (path) => {
//   try {
//     const response = await fetch(`http://localhost:3000/revalidate?path=${path}`, {
//       method: 'GET',
//     });

//     if (!response.ok) {
//       throw new Error('Error revalidating path');
//     }

//     console.log('Path revalidated');
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Example usage:
// revalidatePath('/me/455');
