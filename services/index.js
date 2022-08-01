const UserService = require('./user.service');
const TransactionService = require('./transaction.service');
const SystemService = require('./system.service');
const EventService = require('./event.service');

const UserRepository = require('../repositories/user.repository');
const TransactionRepository = require('../repositories/transaction.repository');
const BetRepository = require('../repositories/bet.repository');
const EventsRepository = require('../repositories/event.repository');
const OddsRepository = require('../repositories/odds.repository');

const userRepository = new UserRepository();
const betRepository = new BetRepository();
const eventRepository = new EventsRepository();
const oddsRepository = new OddsRepository();

const userService = new UserService(
    userRepository
);

const transactionService = new TransactionService(
    new TransactionRepository(),
    userRepository
);

const systemService = new SystemService(
    betRepository,
    eventRepository,
    userRepository
);

const eventService = new EventService(
    eventRepository,
    oddsRepository
);

module.exports = {
    userService,
    transactionService,
    systemService,
    eventService
}

