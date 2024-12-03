const { response, request } = require("express");
const TvShow = require("../models/tvshow");
const { TvShowRepository } = require("../repositorioes/tvshow");

const tvShows = [
    {
        "name": "Breaking Bad",
        "year": 2008,
        "episodes": 62,
        "image": "https://hipermediaciones.com/wp-content/uploads/2013/10/21225_breaking_bad.jpg",
        "description": "Un profesor de química se convierte en fabricante de metanfetaminas después de ser diagnosticado con cáncer terminal."
    },
    {
        "name": "Game of Thrones",
        "year": 2011,
        "episodes": 73,
        "image": "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        "description": "Nobles familias luchan por el control del Trono de Hierro en el continente de Poniente."
    },
    {
        "name": "Stranger Things",
        "year": 2016,
        "episodes": 34,
        "image": "https://images.ctfassets.net/4cd45et68cgf/22eaxyrfqLTOmD0ZgFJDX0/6d7b8a0f4c3130fd87c9921cbd11d180/image5.jpg?w=1200",
        "description": "Un grupo de niños descubre fenómenos sobrenaturales en su pequeña ciudad."
    },
    {
        "name": "The Office",
        "year": 2005,
        "episodes": 201,
        "image": "https://m.media-amazon.com/images/I/91d053F2aKL._AC_UF894,1000_QL80_.jpg",
        "description": "Un documental sobre la vida cotidiana de los empleados en una oficina de ventas de papel."
    }
];

const getAllTvShows = async (req = request, res = response) => {
    const { searchTerm } = req.query;
    
    try{
        const result = await TvShowRepository.getAll({name: RegExp(searchTerm)});
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos"
        })
    }
}

const getTvShowById = async (req = request, res = response) => {
    const { id } = req.params;
    
    try{
        const result = await TvShowRepository.getById(id);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el programa de televisión"
            });
            return;
        }
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos"
        })
    }
}

const createNewTvShow = async (req = request, res = response) => {
    const { name, year, episodes, image, description, genre } = req.body;
    const tvShowData = { name, year, episodes, image, description, genre };

    if( !name || !year || !episodes || !image || !description || !genre){
        res.status(400).json({
            msg: "Información incompleta"
        });
    }

    try{
        const savedTvShow = await TvShowRepository.create(tvShowData);
        res.status(201).json(savedTvShow)
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar el nuevo elemento"
        })
    }

    res.status(200).json({
        msg: "TvShows - POST - /",
        result: 12345
    });
}

const deleteTvShow = async (req = request, res = response) => {
    const { id } = req.params;

    try{
        const result = await TvShowRepository.deleteById(id);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el programa de televisión"
            });
            return;
        }
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar el programa de televisión"
        })
    }
}

const updateTvShow = async (req = request, res = response) => {
    const { id } = req.params;

    try{
        const result = await TvShowRepository.updateById(id);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el programa de televisión"
            });
            return;
        }
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar el programa de televisión"
        })
    }
}

module.exports = {
    getAllTvShows,
    createNewTvShow,
    getTvShowById,
    deleteTvShow,
    updateTvShow
}