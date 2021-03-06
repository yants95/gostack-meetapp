import Meetup from '../models/Meetup';

class DeleteMeetupService {
    async run({ meetup_id, user_id }) {
        const meetup = await Meetup.findByPk(meetup_id);

        if (!meetup) {
            throw new Error('Not found.');
        }

        if (meetup.user_id !== user_id) {
            throw new Error('Not authorized.');
        }

        if (meetup.past) {
            throw new Error("Can't delete past meetups.");
        }

        await meetup.destroy();

        return meetup;
    }
}

export default new DeleteMeetupService();
