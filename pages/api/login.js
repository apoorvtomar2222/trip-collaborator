import { login } from '../../services/redis';

export default async function handler(req, res) {
    const user = await login(req.body);
    res.status(200).json({ user });
}


