const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const initModels = require('../models/init-models').initModels;
const models = initModels(sequelize);
const Artefact = models.artefacts;
const ExhibitionArtefact = models.exhibition_artefacts;

// Returns all artefacts.
exports.artefactList = (request, response) => {
    Artefact.findAll().then((artefacts) => {
        response.json(artefacts);
    })
};

// Returns all artefacts by artist.
exports.artefactsArtistList = (request, response) => {

    let { artist_id } = request.params;

    Artefact.findAll({
        where: { artist_id: artist_id }
    }).then((artefactsArtist) => {
        if (artefactsArtist) {
            response.json(artefactsArtist);
        }
        else {
            response.status(404).send();
        }
    })
};

// Returns artefacts by id.
exports.artefactById = (request, response) => {
    let { artefact_id } = request.params;
    Artefact.findByPk(artefact_id).then((artefact) => {
        if (artefact) {
            response.json(artefact);
        }
        else {
            response.status(404).send();
        }
    })
};

// Creates a new artefact
exports.createArtefact = (request, response) => {

    if (!request.body.title) {
        response.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    const artefact = {
        artist_id: request.body.artist_id,
        title: request.body.title,
        description: request.body.description ? request.body.description : false,
        type: request.body.type,
        material: request.body.material,
        year_made: request.body.year_made,
        created_at: Sequelize.fn('NOW'),
        modified_at: Sequelize.fn('NOW')
    }

    Artefact.create(artefact)
      .then((data) => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
          message: "An error occurred while creating the Artefact."
        });
      });
};

// Updates an artefact
exports.updateArtefact = (request, response) => {

    let { artefact_id } = request.params;
    console.log(request.body);
    Artefact.update(request.body, {
        where: { artefact_id: artefact_id }
        
    })
    .then(num => {
        if (num == 1) {
            Artefact.update({
                modified_at: Sequelize.fn('NOW'),
            },
              {  where: { artefact_id: artefact_id } });
            response.status(200).send({
                message: "Artefact was updated successfully."
            });
        } else {
            response.status(404).send({
                message: "Cannot update Artefact. Maybe Artefact was not found or request.body is empty."
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Error updating Artefact with id=" + artefact_id
        });
        });
    };

// Delete an artefact and associated exhibition artefacts
exports.deleteArtefact = (request, response) => {

    let { artefact_id } = request.params;

    ExhibitionArtefact.destroy({
        where : { artefact_id: artefact_id }
    })

    Artefact.destroy({
        where: { artefact_id: artefact_id }
    })
    .then(num => {
        if (num == 1) {
          response.send({
            message: "Artefact was deleted successfully!"
          });
        } else {
          response.send({
            message: "Artefact with id not found."
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete Artefact with id=" + artefact_id
        });
      });
  };
