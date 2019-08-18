import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;

        const user = await CreateUserService.run({
            name,
            email,
            password,
        });

        return res.json(user);
    }

    async update(req, res) {
        const userObject = req.body;
        userObject.user_id = req.userId;

        const user = await UpdateUserService.run(userObject);

        return res.json(user);
    }
}

export default new UserController();
