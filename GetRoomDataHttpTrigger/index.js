const sql = require('mssql');

module.exports = async function (context, req) {

    try {
        await sql.connect(
            process.env['RoomsDb']
        );
        const result = await sql.query('select * from dbo.Room order by id asc');
        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (e) {
        context.res = {
            status: 400,
            body: "Error"
        };
    }
}