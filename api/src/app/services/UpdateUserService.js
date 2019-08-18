/* eslint-disable no-shadow */
import * as Yup from 'yup';

import User from '../models/User';

class UpdateUserService {
    async run(UserObject) {
        const {
            user_id,
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        } = UserObject;

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(User))) {
            throw new Error('Validation failed');
        }

        const user = await User.findByPk(user_id);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });
            if (userExists) {
                throw new Error('User already exists');
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            throw new Error('Password does not match');
        }

        const userUpdate = await user.update({
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        });

        return userUpdate;
    }
}

export default new UpdateUserService();
