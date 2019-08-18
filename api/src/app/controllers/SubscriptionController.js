import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import CreateSubscriptionService from '../services/CreateSubscriptionService';

class SubscriptionController {
    async index(req, res) {
        const subscriptions = await Subscription.findAll({
            where: { user_id: req.userId },
            include: [
                {
                    model: Meetup,
                    include: [
                        User,
                        {
                            model: File,
                            as: 'File',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                    where: {
                        date: {
                            [Op.gt]: new Date(),
                        },
                    },
                    required: true,
                },
            ],
            order: [[Meetup, 'date']],
        });

        return res.json(subscriptions);
    }

    async store(req, res) {
        const subscription = await CreateSubscriptionService.run({
            meetup_id: req.params.id,
            user_id: req.userId,
        });

        return res.json(subscription);
    }

    async delete(req, res) {
        const subscription = await Subscription.findByPk(req.params.id, {
            include: [Meetup],
        });

        if (!subscription) {
            return res.status(404).json({ error: 'Not found.' });
        }

        if (subscription.user_id !== req.userId) {
            return res.status(401).json({ error: 'Not authorized.' });
        }

        if (subscription.Meetup.past) {
            return res
                .status(400)
                .json({ error: "Can't delete past subscription." });
        }

        await subscription.destroy();

        return res.send();
    }
}

export default new SubscriptionController();
