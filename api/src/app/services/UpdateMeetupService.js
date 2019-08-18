import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';

class UpdateMeetupService {
    async run({
        title,
        file_id,
        meetup_id,
        user_id,
        description,
        location,
        date,
    }) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            file_id: Yup.number(),
            description: Yup.string(),
            location: Yup.string(),
            date: Yup.date(),
        });

        if (
            !(await schema.isValid({
                title,
                file_id,
                description,
                location,
                date,
            }))
        ) {
            throw new Error('Validation fails');
        }

        const meetup = await Meetup.findByPk(meetup_id);

        if (meetup.user_id !== user_id) {
            throw new Error('Not authorized.');
        }

        if (isBefore(parseISO(date), new Date())) {
            throw new Error('Meetup date invalid');
        }

        if (meetup.past) {
            throw new Error("Can't update past meetups.");
        }

        await meetup.update({
            title,
            file_id,
            description,
            location,
            date,
        });

        return meetup;
    }
}

export default new UpdateMeetupService();
