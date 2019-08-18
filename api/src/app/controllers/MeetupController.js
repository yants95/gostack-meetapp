import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';

import CreateMeetupService from '../services/CreateMeetupService';
import UpdateMeetupService from '../services/UpdateMeetupService';
import DeleteMeetupService from '../services/DeleteMeetupService';

class MeetupController {
    async index(req, res) {
        const where = {};
        const { page = 1 } = req.query;

        if (req.query.date) {
            const searchDate = parseISO(req.query.date);

            where.date = {
                [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
            };
        }

        const meetups = await Meetup.findAll({
            where,
            include: [
                User,
                {
                    model: File,
                    as: 'File',
                    attributes: ['id', 'path', 'url'],
                },
            ],
            limit: 10,
            offset: 10 * page - 10,
        });

        return res.json(meetups);
    }

    async single(req, res) {
        const meetup = await Meetup.findByPk(req.params.id, {
            include: [
                {
                    model: File,
                    as: 'File',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        return res.json(meetup);
    }

    async store(req, res) {
        const { title, file_id, description, location, date } = req.body;

        const meetup = await CreateMeetupService.run({
            title,
            file_id,
            user_id: req.userId,
            description,
            location,
            date,
        });

        return res.json(meetup);
    }

    async update(req, res) {
        const { title, file_id, description, location, date } = req.body;

        const meetup = await UpdateMeetupService.run({
            title,
            file_id,
            meetup_id: req.params.id,
            user_id: req.userId,
            description,
            location,
            date,
        });

        return res.json(meetup);
    }

    async delete(req, res) {
        await DeleteMeetupService.run({
            meetup_id: req.params.id,
            user_id: req.userId,
        });

        return res
            .status(200)
            .json({ message: 'Meetup deleted successfully.' });
    }
}

export default new MeetupController();
