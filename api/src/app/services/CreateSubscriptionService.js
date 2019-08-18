import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class CreateSubscriptionService {
    async run({ meetup_id, user_id }) {
        const meetup = await Meetup.findByPk(meetup_id, {
            include: [User],
        });

        if (!meetup) {
            throw new Error('Meetup not found.');
        }

        if (meetup.user_id === user_id) {
            throw new Error("You can't subscribe to your own Meetup.");
        }

        if (meetup.past) {
            throw new Error("You can't subscribe to a past event.");
        }

        const checkAlreadySubscripted = await Subscription.findOne({
            where: { user_id, meetup_id },
        });

        if (checkAlreadySubscripted) {
            throw new Error("You can't subscribe twice to an event.");
        }

        const subscription = await Subscription.create({
            user_id,
            meetup_id,
        });

        const user = await User.findByPk(user_id);
        await Queue.add(SubscriptionMail.key, {
            Meetup,
            user,
        });

        return subscription;
    }
}

export default new CreateSubscriptionService();
