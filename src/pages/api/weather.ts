import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Missing latitude or longitude' });
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  switch (req.method) {
    case 'GET':
      try {
        const response = await axios.get(url);
        return res.status(200).json(response.data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
