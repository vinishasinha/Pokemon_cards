import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import PokemonCard from './PokemonCard';

const Pokemon = () => {
    const [pokemon,setPokemon]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[search,setSearch]=useState("");
    const API="https://pokeapi.co/api/v2/pokemon?limit=100";
    const fetchPokemon=async()=>{
        try {
            const res=await fetch(API);
            const data= await res.json();
            // console.log(data);
            const detailedPokemonData=data.results.map(async(curElem)=>{
                // console.log(curElem.url);
                const res= await fetch(curElem.url);
                const data= await res.json();
                return data;  
            })
    const detailedResponse= await Promise.all(detailedPokemonData)
    // console.log(detailedResponse);
    setPokemon(detailedResponse);
    setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error); 
        }

    }


    useEffect(()=>{
        fetchPokemon();
    },[]);

    //search functionality
    const SearchContent=pokemon.filter((curCard)=>curCard.name
    .toLowerCase()
    .includes(search.toLowerCase()))
         
    

    if(loading)
    {
        return(
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }

    if(error)
    {
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }


  return (
    <section className='container'>
    <header>
        <h1>Lets Catch Pokemon</h1>
    </header>
    <div className='pokemon-search'>
        <input type="text" placeholder='Search Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)} />

    </div>
    <ul className='cards'> 
        {
           SearchContent.map((curElem)=>{ 
                return <PokemonCard key={curElem.id} pokemonData={curElem}/>
                 })
        }

    </ul>

</section>
  )
}

export default Pokemon