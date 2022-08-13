import { searchLocation } from '../../services/redis';

export default async function handler(req, res) {
    const q = req.query.q;
    const locations = await searchLocation(q);
    res.status(200).json({ locations });
}