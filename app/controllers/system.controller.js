const systemService = require('../../services').systemService;
const httpCodes = require('../../constants/http');
const statsPresenter = require('../presenter/stats.presenter');

exports.health = (req, res, next) => {
    try {
        res.status(httpCodes.OK_HTTP_CODE).json({
            message: 'Hello world!'
        });
    } catch (e) {
        next(e);
    }
}

exports.stats = async (req, res, next) => {
    try {
        const stats = await systemService.getStats();
        console.log(stats);
        res.status(httpCodes.OK_HTTP_CODE).json(
            statsPresenter({
                totalUsers: stats.getTotalUsers(),
                totalBets: stats.getTotalBets(),
                totalEvents: stats.getTotalEvents()
            })
        );
    } catch (e) {
        next(e);
    }
}