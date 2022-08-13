import { getUsers } from '../../services/redis';


export default async function handler(req, res) {
    const users = await getUsers();
    res.status(200).json({ users });
}