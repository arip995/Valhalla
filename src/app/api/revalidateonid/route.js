'use server';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json(
      { error: 'Path is required' },
      { status: 400 }
    );
  }

  try {
    revalidatePath(path);

    return NextResponse.json(
      { message: 'Path revalidated' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating path' },
      { status: 500 }
    );
  }
}
