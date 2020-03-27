const connection = require('../database/connection');
const crypto = require('crypto')

module.exports = {
    //Método de listar dados dos banco de dados
    async index(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs)
    },
    // Método de adicionar/criar dados no banco
    async create(req, res) {
        // Armazenando os dados em variaveis diferentes
        const { name, email, whatsapp, city, uf } = req.body;
        // Definindo ID aleatorios para entidade ONG no banco de dados
        const id = crypto.randomBytes(4).toString('HEX') // Gerando 4 bytes de caracteres hexadecimal aleatorios


        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,

        })

        return res.json({ id })
    }

}