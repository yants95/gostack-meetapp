import Mail from '../../lib/Mail';

class SubscriptionMail {
    get key() {
        return 'SubscriptionMail';
    }

    async handle({ data }) {
        const { Meetup, user } = data;

        await Mail.sendMail({
            to: `${Meetup.User.name} <${Meetup.User.email}>`,
            subject: `[${Meetup.title}] Nova inscrição`,
            template: 'subscription',
            context: {
                organizer: Meetup.User.name,
                Meetup: Meetup.title,
                user: user.name,
                email: user.email,
            },
        });
    }
}

export default new SubscriptionMail();
