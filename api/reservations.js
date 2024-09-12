const express = require("express");
const reservationsRouter = express.Router();

const { requireUser } = require("./utils");

const { getReservation, getUsersReservations, deleteReservation, updateBooks, getBook, } = require("../db");

reservationsRouter.get("/", requireUser, async (req, res, next) =>{
    try {
        const reservations = await getUsersReservations(req.user.id);
        console.log(reservations);
        res.send("reservations here");
    } catch (err) {
        next(err);
    }
});

reservationsRouter.delete("/:id", requireUser, async (req, res, next) => {
    try{
        const reservation = await getReservation(req.params.id);
        console.log("RESERVATION", reservation);
        if (!reservation) {
            next({
                name: "ReservationDoesNotExist",
                message: "Nothing to return here...",
            });
            return;
        }else if(req.user.id !== reservation.user.id){
            next({name:"Permission Denied", message:"You do not have permission to return this book"});
            return;
        } else {
            const deletedReservation = await deleteReservation(req.params.id);
            const book = await getBook(deletedRerservation.bookId);
            if (deletedRerservation) {
                updateBooks(book.id, true);
            }
            res.send({ deletedReservation });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = reservationsRouter;
