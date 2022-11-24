import { useToast, FlatList } from 'native-base';
import { useState, useEffect } from 'react';

import { api } from '../services/api';
import { Game, GameProps } from './Game'
import { Loading } from './Loading'

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {

  const [isLoading, setIsLoading] = useState(true)
  const [game, setGame] = useState<GameProps[]>()
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [ secondTeamPoints, setSecondTeamPoints] = useState('')
  const toast = useToast()

  async function fetchGames(){
    try {
        setIsLoading(true)

    const response =  await api.get(`/pools/${poolId}/games`)
    console.log(response.data.games)
    setGame(response.data.games)
        
    } catch (error) {

        console.log(error)

    toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
    })
        
    }finally{
        setIsLoading(false)
    }
}

async function handleGuessConfirm(gameId: string){

  try {
    if(!firstTeamPoints.trim() || !secondTeamPoints.trim() ){

    return  toast.show({
        title: 'Informe o placa do palpite',
        placement: 'top',
        bgColor: 'red.500'
    })

    }

    await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
      firstTeamPoints: Number(firstTeamPoints),
      secondTeamPoints: Number(secondTeamPoints),
    });


    toast.show({
      title: 'Palpite realizado com sucesso!',
      placement: 'top',
      bgColor: 'green.500'
  })

  fetchGames()
    
  } catch (error) {
    console.log(error)

    toast.show({
        title: 'Não foi possível carregar enviar o palpite',
        placement: 'top',
        bgColor: 'red.500'
    })
    
  }

}
useEffect(() => {
  fetchGames()
},[poolId])

if(isLoading){
  return <Loading />
}

  return (
    <FlatList 
    data={game} 
    keyExtractor={item => item.id}
    renderItem={ ({item}) => (
      <Game 
        data={item}
        setFirstTeamPoints={setFirstTeamPoints}
        setSecondTeamPoints={setSecondTeamPoints}
        onGuessConfirm={ () => handleGuessConfirm(item.id)}
        />
    )}
    />

    
  );
}
