import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class CreateMeetupService {
    async run({ title, file_id, user_id, description, location, date }) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            file_id: Yup.number().required(),
            user_id: Yup.number().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
        });

        if (
            !(await schema.isValid({
                title,
                file_id,
                user_id,
                description,
                location,
                date,
            }))
        ) {
            throw new Error('Validation fails');
        }

        if (isBefore(parseISO(date), new Date())) {
            throw new Error("You can't register a past date");
        }

        const meetup = await Meetup.create({
            title,
            file_id,
            user_id,
            description,
            location,
            date,
        });

        return meetup;
    }
}

export default new CreateMeetupService();
