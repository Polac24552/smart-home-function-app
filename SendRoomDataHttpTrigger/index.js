const sql = require('mssql');
const moment = require('moment');

module.exports = async function (context, req) {

    const data = req.body;

    try {
        await sql.connect(
            process.env['RoomsDb']
        );

        const last_sync_time = moment().format('YYYY-MM-DD HH:mm:ss');

        const result = await sql.query(`UPDATE dbo.Room SET state = ${data.state} WHERE name = '${data.name}'`);

        const timeSync = await sql.query(`UPDATE dbo.Room SET last_sync_time = CAST('${last_sync_time}' AS DATETIME)`);

        context.res = {
            status: 200,
            body: "Data saved successfully"
        };
    } catch (e) {
        context.res = {
            status: 400,
            body: "Data error"
        };
    }
}