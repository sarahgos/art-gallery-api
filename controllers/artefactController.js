const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const initModels = require('../models/init-models').initModels;
const models = initModels(sequelize);
const Artefact = models.artefacts;

const { Op } = Sequelize;

// Filter artefacts using sequelize.
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

    Artefact.findAll(filter).then((artefact) => {
        response.json(artefact);
    });
};

// Returns all artefacts.
exports.artefactList = (request, response) => {
    Artefact.findAll().then((artefacts) => {
        response.json(artefacts);
    })
};

// Returns artefacts by id.
exports.artefactById = (request, response) => {
    let { id } = request.params;
    Artefact.findByPk(id).then((artefact) => {
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
        date: request.body.date,
        created_at: Sequelize.fn('NOW'),
        modified_at: Sequelize.fn('NOW')
    }

    Artefact.create(artefact)
      .then((data) => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
          message:
            err.message || "An error occurred while creating the Artefact."
        });
      });
};

// Updates an artefact
exports.updateArtefact = (request, response) => {

    let { id } = request.params;

    Artefact.update(request.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            Artefact.update({
                modified_at: Sequelize.fn('NOW'),
            },
              {  where: { id: id } });
            response.send({
            message: "Artefact was updated successfully."
            });
        } else {
            response.send({
            message: `Cannot update Artefact with id=${id}. Maybe Artefact was not found or request.body is empty!`
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Error updating Artefact with id=" + id
        });
        });
    };

// Delete an artefact
exports.deleteArtefact = (request, response) => {

    let { id } = request.params;

    Artefact.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
          response.send({
            message: "Artefact was deleted successfully!"
          });
        } else {
          response.send({
            message: `Cannot delete Artefact with id=${id}. Maybe Artefact was not found!`
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete Artefact with id=" + id
        });
      });
  };
