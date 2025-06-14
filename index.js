const Alexa = require('ask-sdk-core');
const fetch = require('node-fetch');

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = 'Hola, soy tu asistente. Puedes preguntarme por actividades del fin de semana o de alguna temática.';
		return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
	}
};

const WeekendActivitiesIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'WeekendActivitiesIntent';
	},
	// async handle(handlerInput) {
	// 	try {
	// 		const response = await fetch('https://api.bondyapp.com/plans/weekend');
	// 		const data = await response.json();

	// 		const titles = data.slice(0, 3).map(plan => plan.title).join(', ');
	// 		const speechText = data.length
	// 			? `Estas son algunas actividades para el finde: ${titles}`
	// 			: 'No hay actividades disponibles para este fin de semana.';

	// 		return handlerInput.responseBuilder.speak(speechText).getResponse();
	// 	} catch (err) {
	// 		return handlerInput.responseBuilder.speak('Ha ocurrido un error al obtener las actividades.').getResponse();
	// 	}
	// }
    async handle(handlerInput) {
		try {
            const data = [{
                title: 'Caminata por el parque',
                description: 'Disfruta de una caminata al aire libre en el parque central.',
                date: '2023-10-07',
                location: 'Parque Central'
            }, {
                title: 'Clase de yoga',
                description: 'Relájate y mejora tu flexibilidad con una clase de yoga.',
                date: '2023-10-08',
                location: 'Estudio de Yoga Local'
            }, {
                title: 'Concierto en vivo',
                description: 'Asiste a un concierto de tu banda favorita en el centro cultural.',
                date: '2023-10-07',
                location: 'Centro Cultural'
            }];
			const titles = data.slice(0, 3).map(plan => plan.title).join(', ');
			const speechText = data.length
				? `Estas son algunas actividades para el finde: ${titles}`
				: 'No hay actividades disponibles para este fin de semana.';

			return handlerInput.responseBuilder.speak(speechText).getResponse();
		} catch (err) {
			return handlerInput.responseBuilder.speak('Ha ocurrido un error al obtener las actividades.').getResponse();
		}
	}
};

const ThematicActivitiesIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'ThematicActivitiesIntent';
	},
	// async handle(handlerInput) {
	// 	const slots = handlerInput.requestEnvelope.request.intent.slots;
	// 	const category = slots.category.value || 'running';
	// 	const period = slots.period.value || 'mes';

	// 	try {
	// 		const url = `https://api.bondyapp.com/plans/search?category=${encodeURIComponent(category)}&period=${encodeURIComponent(period)}`;
	// 		const response = await fetch(url);
	// 		const data = await response.json();

	// 		const titles = data.slice(0, 3).map(plan => plan.title).join(', ');
	// 		const speechText = data.length
	// 			? `Estas son actividades de ${category} para este ${period}: ${titles}`
	// 			: `No encontré actividades de ${category} para este ${period}`;

	// 		return handlerInput.responseBuilder.speak(speechText).getResponse();
	// 	} catch (err) {
	// 		return handlerInput.responseBuilder.speak('Ha ocurrido un error al obtener las actividades.').getResponse();
	// 	}
	// }
    async handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		const category = slots.category.value || 'running';
		const period = slots.period.value || 'mes';

		try {
			const data = [{
                title: 'Caminata por el parque',
                description: 'Disfruta de una caminata al aire libre en el parque central.',
                date: '2023-10-07',
                location: 'Parque Central', 
                category: 'running',
            }, {
                title: 'Clase de yoga',
                description: 'Relájate y mejora tu flexibilidad con una clase de yoga.',
                date: '2023-10-08',
                location: 'Estudio de Yoga Local',
                category: 'running',
            }, {
                title: 'Concierto en vivo',
                description: 'Asiste a un concierto de tu banda favorita en el centro cultural.',
                date: '2023-10-07',
                location: 'Centro Cultural', 
                category: 'running',
            }];

			const titles = data.slice(0, 3).map(plan => plan.title).join(', ');
			const speechText = data.length
				? `Estas son actividades de ${category} para este ${period}: ${titles}`
				: `No encontré actividades de ${category} para este ${period}`;

			return handlerInput.responseBuilder.speak(speechText).getResponse();
		} catch (err) {
			return handlerInput.responseBuilder.speak('Ha ocurrido un error al obtener las actividades.').getResponse();
		}
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Puedes decir: dime qué actividades hay para el fin de semana, o actividades de running para este mes.')
			.getResponse();
	}
};

const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
				|| Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder.speak('Adiós desde Bondy!').getResponse();
	}
};

const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.error(`Error: ${error.message}`);
		return handlerInput.responseBuilder.speak('Lo siento, ha ocurrido un error.').getResponse();
	}
};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequestHandler,
		WeekendActivitiesIntentHandler,
		ThematicActivitiesIntentHandler,
		HelpIntentHandler,
		CancelAndStopIntentHandler
	)
	.addErrorHandlers(ErrorHandler)
	.lambda();
