
import { addUsers } from '../../services/redis';

export default async function handler(req, res) {
    await addUsers();
    res.status(200).json({ status: 'User created.' })
}