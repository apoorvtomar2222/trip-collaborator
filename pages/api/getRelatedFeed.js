import { getRelatedFeed } from '../../lib/redis';

export default async function handler(req, res) {
    const entityId = req.query.entityId;
    const feeds = await getRelatedFeed(entityId);
    res.status(200).json({ feeds });
}