import { addLocation } from '../../services/redis';

export default async function handler(req, res) {
    const id = await addLocation(req.body);
    res.status(200).json({ id })
}