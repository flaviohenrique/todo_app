import { ITodo } from '../../interfaces';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITodo[]>
) {
  const todos = await fetch(`${process.env.HOST}/`)
  res.status(200).json(todos.json())
}
