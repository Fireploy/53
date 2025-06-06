import { Router } from 'express';
import {
	bodyValidator,
	paramsValidator,
	queryValidator
} from '../middlewares/validator';
import * as yup from 'yup';
import { checkSession } from '../middlewares/checkSession';
import { checkAuth } from '../middlewares/checkAuth';
import { eventController } from '../controllers/event';
import {
	COMBATSTATUS,
	dateRegex,
	timeRegex
} from '../codeUtils/globals';

export const eventRouter = Router({ mergeParams: true });

//create a event reunion
eventRouter.post('/meet', bodyValidator(yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
	trainer: yup.string().required(),
	date: yup.string().required().matches(dateRegex),
	startsAt: yup.string().required().matches(timeRegex),
	endsAt: yup.string().required().matches(timeRegex),
	participants: yup.array().required().min(1)
})), checkSession, checkAuth(['Admin', 'Entrenador']), eventController.createEventMeet);

//create a event combat
eventRouter.post('/battle', bodyValidator(yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
	trainer: yup.string().required(),
	date: yup.string().required().matches(dateRegex),
	startsAt: yup.string().required().matches(timeRegex),
	endsAt: yup.string().required().matches(timeRegex),
	combats: yup.array().of(yup.object().shape({
		boxer1: yup.string().required(),
		boxer2: yup.string().required()
	})).required().min(1)
})), checkSession, checkAuth(['Admin', 'Entrenador']), eventController.createEventBattle);

//get Events
eventRouter.get('/', paramsValidator(yup.object().shape({
	limit: yup.string(),
	startsAt: yup.string().matches(dateRegex),
	endsAt: yup.string().matches(dateRegex),
})), checkSession, checkAuth([]), eventController.getEvent);

//get Event by Id
eventRouter.get('/Info', queryValidator(yup.object().shape({
	eventId: yup.string().required()
})), checkSession, checkAuth([]), eventController.getEventById);

//set event results
eventRouter.patch('/result', bodyValidator(yup.object().shape({
	eventId: yup.string().required(),
	combats: yup.array().of(yup.object().shape({
		battleId: yup.string().required(),
		status: yup.string().required().oneOf(COMBATSTATUS),
		winner: yup.string()
	})).required().min(1)
})), checkSession, checkAuth(['Admin']), eventController.setEventResult);
