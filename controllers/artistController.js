const Sequelize = require('sequelize');
const Artist = require('../models/artist');

const { Op } = Sequelize;

// Filter artists using sequelize.
exports.filter = (request, response) => {
    let filter = {};
    let { q } = request.query;

    if (q) {
        filter = {
            where: {
                first_name: {
                    [Op.like]: `${q}%`
                }
            }
        };
    }

    Artist.findAll(filter).then((artists) => {
        response.json(artists);
    });
};

// Returns all artists.
exports.artistList = (request, response) => {
    Artist.findAll().then((artists) => {
        response.json(artists);
    })
};

// Returns artist by id.
exports.artistById = (request, response) => {
    let { id } = request.params;
    Artist.findByPk(id).then((artist) => {
        if (artist) {
            response.json(artist);
        }
        else {
            response.status(404).send();
        }
    })
};

exports.createArtist = (request, response) => {

    if (!request.body.first_name || !request.body.last_name) {
        response.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    const artist = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        dob: request.body.dob ? request.body.dob : false,
        created_at: Sequelize.fn('NOW'),
        modified_at: Sequelize.fn('NOW')
    }

    Artist.create(artist)
      .then((data) => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
          message:
            err.message || "An error occurred while creating the Artist."
        });
      });
};

exports.updateArtist = (request, response) => {

    let { id } = request.params;

    Artist.update(request.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            Artist.update({
                modified_at: Sequelize.fn('NOW'),
            },
              {  where: { id: id } });
            response.send({
            message: "Artist was updated successfully."
            });
        } else {
            response.send({
            message: `Cannot update Artist with id=${id}. Maybe Artist was not found or request.body is empty!`
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Error updating Artist with id=" + id
        });
        });
    };
