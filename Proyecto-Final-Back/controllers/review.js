const { response, request } = require("express");
const Review = require("../models/review");
const { ReviewRepository } = require("../repositories/review");

const deleteReview = async (req = request, res = response) => {
    const { id } = req.params;

    try{
        const result = await ReviewRepository.deleteById(id);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró la reseña"
            });
            return;
        }
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar la reseña"
        })
    }
}

const createReview = async (req = request, res = response) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.userActive._id;

    if(!comment){
        res.status(400).json({
            msg: "Información incompleta"
        });
    }

    const reviewData = {
        userId: userId,
        bookId: id,
        comment: comment
    }

    try{
        const savedReview = await ReviewRepository.create(reviewData);
        res.status(201).json(savedReview)
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar la reseña"
        })
    }
}

module.exports = {
    deleteReview,
    createReview
}