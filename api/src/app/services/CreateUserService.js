import * as Yup from 'yup';

import User from '../models/User';

class CreateUserService {
    async run({ name, email, password }) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid({ name, email, password }))) {
            throw new Error('Validation failed');
        }

        const userExists = await User.findOne({
            where: { email },
        });

        if (userExists) {
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        return user;
    }
}

export default new CreateUserService();
