import { removeFeed } from '../../lib/redis';

export default async function handler(req, res) {
    const entityId = req.query.entityId;
    const userEntityId = req.query.userEntityId;

    const id = await removeFeed(entityId, userEntityId);
    res.status(200).json({ id })
}