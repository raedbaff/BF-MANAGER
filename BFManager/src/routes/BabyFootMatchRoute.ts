import { Router } from "express";
import { createMatchHandler,deleteMatchByIdHandler,getMatchByIdHandler, getMatchesHandler, updateMatchHandler } from "../controllers/babyFootMatchController";
const createRouter = (io:any) => {
    const router = Router();

    router.post("/match", (req, res) => createMatchHandler(req, res, io));
    router.get("/match/:id", getMatchByIdHandler);
    router.get("/match", getMatchesHandler);
    router.put("/match", (req,res)=> updateMatchHandler(req,res,io));
    router.delete("/match/:id",(req,res)=>deleteMatchByIdHandler(req,res,io))

    return router;
};

export default createRouter;