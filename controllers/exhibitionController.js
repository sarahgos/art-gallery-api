const Sequelize = require('sequelize');
const Exhibition = require('../models/exhibition');

const { Op } = Sequelize;

// Filter exhibitions using sequelize.
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

    Exhibition.findAll(filter).then((exhibitions) => {
        response.json(exhibitions);
    });
};

// Returns all exhibitions.
exports.exhibitionList = (request, response) => {
    Exhibition.findAll().then((exhibition) => {
        response.json(exhibition);
    })
};

// Returns exhibition by id.
exports.exhibitionById = (request, response) => {
    let { id } = request.params;
    Exhibition.findByPk(id).then((exhibition) => {
        if (exhibition) {
            response.json(exhibition);
        }
        else {
            response.status(404).send();
        }
    })
};

// Create an exahibition.
exports.createExhibition = (request, response) => {

    if (!request.body.title || !request.body.artists) {
        response.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    const exhibition = {
        title: request.body.title,
        artists: request.body.artists,
        description: request.body.description ? request.body.description : false,
        type: request.body.type,
        start_date: request.body.start_date,
        end_date: request.body.end_date,
        created_at: Sequelize.fn('NOW'),
        modified_at: Sequelize.fn('NOW')
    }

    Exhibition.create(exhibition)
      .then((data) => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
          message:
            err.message || "An error occurred while creating the Exhibition."
        });
      });
};

// Update and exhibition
exports.updateExhibition = (request, response) => {

    let { id } = request.params;

    Exhibition.update(request.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            Exhibition.update({
                modified_at: Sequelize.fn('NOW'),
            },
              {  where: { id: id } });
            response.send({
            message: "Exhibition was updated successfully."
            });
        } else {
            response.send({
            message: `Cannot update Exhibition with id=${id}. Maybe Exhibition was not found or request.body is empty!`
            });
        }
        })
        .catch(err => {
        response.status(500).send({
            message: "Error updating Exhibition with id=" + id
        });
        });
    };
