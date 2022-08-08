
import { addLocations } from '../../lib/redis';

export default async function handler(req, res) {
    const resp = await addLocations();
    res.status(200).json(resp)
}