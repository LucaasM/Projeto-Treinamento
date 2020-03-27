const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        // Verificando se a ong está no sistema 
        if (!ong) {
            return res.status(400).json({ error: "ID da ong não está presente no sistema" })
        } else {
            return res.json(ong)
        }
    }
}