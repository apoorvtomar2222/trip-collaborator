import { createUserIndex } from '../../services/redis';

export default async function handler(req, res) {
    await createUserIndex();
    res.status(200).send('ok');
}


