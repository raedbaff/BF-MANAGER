import { client } from "../data/db";

async function createMatch(name:string): Promise<number | null> {
    try {
        const query = 'INSERT INTO babyFootMatches (name, finished) VALUES ($1, $2) RETURNING id';
        const values = [name,false];
        const result = await client.query(query, values);
        return result.rows[0].id;


    }
    catch(error){
        console.error('Error creating match:', error);
        return null;

    }
}


async function getMatchById(id: number): Promise<any | null> {
    try {
      const query = 'SELECT * FROM babyFootMatches WHERE id = $1';
      const values = [id];
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error getting match by id:', error);
      return null;
    }
  }
async function updateMatch(id: number,finished:boolean): Promise<any |null> {
  try {
    const query = 'UPDATE babyFootMatches SET finished = $1 WHERE id = $2';
    const values=[finished,id]
    const result= await client.query(query,values)
    if (result.rowCount === 1) {
      return true; 
  } else {
      return false;
  }
    
  }
  catch(error){
    console.log(error);
    
    console.log("Error updating match with id ",id);
    

  }

}

async function deleteMatchById(id:number):Promise<any | null>{
  try {
    const query="DELETE FROM babyFootMatches WHERE id = $1 RETURNING *"
    const values=[id]
    const result=await client.query(query,values)
    return result.rows[0]

  }
  catch(error){
    console.log(error);
    return null;
    

  }
}

async function getAllMatches(): Promise<any | null>{
    try {
        const query = 'SELECT * FROM babyFootMatches';
        const result = await client.query(query)
        return result.rows
    
    }
    catch(error){
        console.log("Error getting matches",error);
        return null;
        

    }
}

  export {createMatch,getMatchById,getAllMatches,updateMatch,deleteMatchById}