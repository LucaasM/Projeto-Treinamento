const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        // Informando a página especifica
        const { page = 1 } = req.query
            // Informando total de casos no banco
        const [count] = await connection('incidents').count()

        const casos = await connection('incidents')
            //Produto cartesiano
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            // Limitando a listagem para apenas cinco dados 
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        // Passando o total dos casos para front atraves do header
        res.header('x-total-count', count['count(*)'])

        return res.json(casos)
    },
    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization; // Pegando o ID da ong logada ao sistema

        //Pegando o ID gerando atraves do autoincremento
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return res.json({ id })
    },
    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        // Selecionando no banco de dados ONG_ID caso o ID estaja cadastrado no banco
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        // Verificando se ong_id autorizado/presente no sistema é o mesmo ID da ong que deseja excluir o incidente
        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operação não permitida' })
        } else {
            await connection('incidents').where('id', id).delete();
        }

        return res.status(204).send();


    }
}