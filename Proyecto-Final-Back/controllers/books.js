const { response, request } = require("express");
const Book = require("../models/book");
const { BookRepository } = require("../repositories/book");
const { ReviewRepository } = require("../repositories/review");

const getAllBooks = async (req = request, res = response) => {
    const { searchTerm } = req.query;
    
    try{
        const result = await BookRepository.getAll({name: RegExp(searchTerm)});
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos"
        })
    }
}

const getBookById = async (req = request, res = response) => {
    const { id } = req.params;
    
    try{
        const result = await BookRepository.getById(id);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el libro"
            });
            return;
        }
        const reviews = await ReviewRepository.getById(id);
        res.status(200).json({
            book: result,
            reviews: reviews
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos"
        })
    }
}

const createNewBook = async (req = request, res = response) => {
    const { name, year, image, description, genre, editorial, author } = req.body;
    const bookData = { name, year, image, description, genre, editorial, author };

    if( !name || !year || !image || !description || !genre || !editorial || !author){
        return res.status(400).json({
            msg: "Información incompleta"
        });
    }

    try{
        const savedBook = await BookRepository.create(bookData);
        res.status(201).json(savedBook)
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar el nuevo elemento"
        })
    }
}

const deleteBook = async (req = request, res = response) => {
    const { id } = req.params;

    try{
        const result = await BookRepository.deleteById(id);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el libro"
            });
            return;
        }
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar el libro"
        })
    }
}

const updateBook = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, year, image, description, genre, editorial, author } = req.body;
    const bookData = { name, year, image, description, genre, editorial, author };
    console.log(bookData);

    if( !name || !year || !image || !description || !genre || !editorial || !author){
        return res.status(400).json({
            msg: "Información incompleta"
        });
    }

    try{
        const result = await BookRepository.updateById(id, bookData);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el libro"
            });
            return;
        }
        const updatedBooks = await BookRepository.getAll();
        res.status(200).json(updatedBooks);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar el libro"
        })
    }
}

module.exports = {
    getAllBooks,
    createNewBook,
    getBookById,
    deleteBook,
    updateBook
}