import { addRelatedFeed } from '../../services/redis';

export default async function handler(req, res) {
    const users = await addRelatedFeed(req.body);
    res.status(200).json({ users });
}