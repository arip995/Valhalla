import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const authHeader = req.headers.get('Authorization');
  console.log('Corn job called');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  await axios.post(
    'https://nexify.club/api/v1/test/console'
  );

  return NextResponse.json({ ok: true });
}
