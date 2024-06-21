import { Request,Response } from "express";
import { createMatch,deleteMatchById,getAllMatches,getMatchById, updateMatch } from "../services/babyFootMatchService";

async function createMatchHandler(req: Request, res: Response,io:any): Promise<void> {
    const { name } = req.body;
    const matchId = await createMatch(name);
    if (matchId) {
      const newMatch={
        id:matchId,
        name,
        finished:false
      }
      io.emit("newMatch",newMatch)
      res.status(201).json({ id: matchId, name });
    } else {
      res.status(500).json({ error: 'Failed to create match' });
    }
  }

  async function getMatchByIdHandler(req: Request, res: Response): Promise<void> {
    const matchId = parseInt(req.params.id, 10);
    const match = await getMatchById(matchId);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ error: `match with id ${matchId} not found`});
    }
  }

  async function getMatchesHandler(req:Request, res: Response): Promise<void> {
    const matches = await getAllMatches();
    if (matches) {
        res.json(matches)
    }
    else {
        res.status(404).json({error:'No matches Found'})
    }
  }

  async function deleteMatchByIdHandler (req:Request,res: Response,io:any):Promise<any> {
    const id = parseInt(req.params.id, 10);
    const match=await deleteMatchById(id);
    
    if (match){
      io.emit("matchDeleted")
      res.status(200).json({success:"Delete successfully"})
    }
    else {
      res.status(400).json({error:`could not delete match with id ${id}`})
    }
  }
  
  async function updateMatchHandler(req: Request,res: Response,io:any):Promise<any> {
    const {id,finished} = req.body
    const updated= await updateMatch(id,finished);
    
    if (updated) {
      io.emit("matchUpdated")
      res.status(200).json({success:"updated match successfully"})
    }
    else {
      res.status(400).json({error:"error updating match"})
    }
  }

  export {createMatchHandler,getMatchByIdHandler,getMatchesHandler,updateMatchHandler,deleteMatchByIdHandler}