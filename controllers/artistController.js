const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const initModels = require('../models/init-models').initModels;
const models = initModels(sequelize);
const Artist = models.artists;
const Artefact = models.artefacts;

// Returns all artists.
exports.artistList = (request, response) => {
    Artist.findAll().then((artists) => {
        response.json(artists);
    })
};

// Returns artist by id.
exports.artistById = (request, response) => {
    let { artist_id } = request.params;
    Artist.findByPk(artist_id).then((artist) => {
        if (artist) {
            response.json(artist);
        }
        else {
            response.status(404).send();
        }
    })
};

// Create an artist
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
          message: "An error occurred while creating the Artist."
        });
      });
};

// Update an artist
exports.updateArtist = (request, response) => {

    let { artist_id } = request.params;

    Artist.update(request.body, {
        where: { artist_id: artist_id }
    })
    .then(num => {
        if (num == 1) {
            Artist.update({
                modified_at: Sequelize.fn('NOW'),
            },
              {  where: { artist_id: artist_id } });
            response.status(200).send({
                message: "Artist was updated successfully."
            });
        } else {
            response.status(404).send({
                message: "Cannot update Artist. Maybe Artist was not found or request.body is empty."
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Error updating Artist with id=" + artist_id
        });
        });
    };

// Delete an artist an associated artefacts
exports.deleteArtist = (request, response) => {

    let { artist_id } = request.params;

    Artefact.destroy({
        where : { artist_id: artist_id }
    })

    Artist.destroy({
        where: { artist_id: artist_id }
    })
    .then(num => {
        if (num == 1) {
          response.status(200).send({
            message: "Artists was deleted successfully."
          });
        } else {
          response.status(404).send({
            message: "Artist with id was not found."
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete Artists with id=" + artist_id
        });
      });
  };
