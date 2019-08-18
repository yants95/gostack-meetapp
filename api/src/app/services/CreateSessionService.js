import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class CreateSessionService {
    async run({ email, password }) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid({ email, password }))) {
            throw new Error('Validation failed');
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        if (!(await user.checkPassword(password))) {
            throw new Error('Password does not match');
        }

        const { id, name } = user;

        const sessionUser = {};

        sessionUser.user = { id, name, email };
        sessionUser.token = jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });

        return sessionUser;
    }
}

export default new CreateSessionService();
