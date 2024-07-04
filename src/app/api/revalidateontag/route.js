'use server';

import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const tags = searchParams.get('tags');

  if (!tags) {
    return NextResponse.json(
      { error: 'Tags are required' },
      { status: 400 }
    );
  }

  try {
    await revalidateTag({
      cacheKey: () => `tags:${tags}`,
      revalidateMode: 'revalidate',
    });

    return NextResponse.json(
      { message: 'Tags revalidated' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating tags' },
      { status: 500 }
    );
  }
}
