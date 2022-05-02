import { Autocomplete, Button, Card, CardContent, CardMedia, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Number', width: 70 },
  { field: 'name', headerName: 'Pokemon', width: 130 },
];

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
    weight: "",
    abilities1: "",
    abilities2: ""
  })
  const [pokemonList, setPokemonList] = useState({
    name: "",
    id: ""
  })


  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
      );

      setPokemonList(result.data.results.map((data, index) => (
        {
          name: data.name,
          id: index + 1,
        }
      )));
    };

    fetchData();
  }, []);



  const searchPokemon = () => {
    console.log(pokemonName)
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
          weight: response.data.weight,
          abilities1: response.data.abilities[0].ability.name,
          abilities2: response.data.abilities[1].ability.name
        })
        setPokemonChosen(true);
      })
  }



  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', margin: '50px 200px', gap: "50px" }}>

      {pokemonChosen &&
        <Box >
          <Card sx={{ minWidth: 400 }}>
            <CardMedia
              component="img"
              alt="pokemon img"
              height="100%"
              image={pokemon.img}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                {pokemon.name}
              </Typography>
              <List sx={{ width: '100%', maxWidth: 550 }}>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Species:" />
                  <ListItemText primary={pokemon.species} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Type:" />
                  <ListItemText primary={pokemon.type} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Weight:" />
                  <ListItemText primary={pokemon.weight} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Hp:" />
                  <ListItemText primary={pokemon.hp} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Attack:" />
                  <ListItemText primary={pokemon.attack} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Defense:" />
                  <ListItemText primary={pokemon.defense} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Speed:" />
                  <ListItemText primary={pokemon.speed} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Abilities:" />
                  <ListItemText primary={pokemon.abilities1} />
                </ListItem>
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Special Abilities:" />
                  <ListItemText primary={pokemon.abilities2} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box >
      }

      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <Typography variant="h2">Pokemon</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={pokemonList}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name || ""}
          onChange={(event, newValue) => {
            setPokemonName(newValue.name);
          }}
          renderInput={(params) => <TextField {...params} label="Pokemon" />}
        />
        {/* <Input placeholder="Pokemon" onChange={(event) => { setPokemonName(event.target.value) }} /> */}
        <Button onClick={searchPokemon}>Search Pokemon</Button>
        <Box sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={pokemonList}
            getRowId={row => row.id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </ Box>
  );
}

export default App;
