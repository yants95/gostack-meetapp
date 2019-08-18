import CreateSessionService from '../services/CreateSessionService';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const session = await CreateSessionService.run({
            email,
            password,
        });

        return res.json(session);
    }
}

export default new SessionController();
