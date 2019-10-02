defmodule Memory.Game do

  def new() do

    %{

       tileOne: nil,

       tileTwo: nil, 

       letters: initiateLst(),

       present: initiatepre(),

       clicks: 0,

       click_disabled: false

     }

  end



  def client_view(game) do

    tileOne = game.tileOne

    tileTwo = game.tileTwo

    letters = game.letters

    present = game.present

    clicks = game.clicks

    click_disabled = game.click_disabled



    %{

       tileOne: tileOne,

       tileTwo: tileTwo,

       letters: letters,

       present: present,

       clicks: clicks,

       click_disabled: click_disabled

      }

  end



  def handle_click(game,index) do

    tileOne = game.tileOne

    tileTwo = game.tileTwo

    clicks = game.clicks + 1

    letters = game.letters

    present = game.present

    

    present_temp = List.replace_at(present,index,Enum.at(letters,index))



    if(tileOne == nil) do

      Map.put(game, :clicks,clicks)

      |>Map.put(:present,present_temp)

      |>Map.put(:tileOne,index)

    else

      Map.put(game, :clicks,clicks)

      |>Map.put(:present,present_temp)

      |>Map.put(:tileTwo,index)

      |>Map.put(:click_disabled,true)



    end

  end



  def check_match (game) do 
    if(Enum.at(game.letters,game.tileOne) == Enum.at(game.letters,game.tileTwo)) do
      game

      |> Map.put(:tileOne, nil)

      |> Map.put(:tileTwo, nil)

      |> Map.put(:click_disabled, false)

    else
      tileOne = game.tileOne

      tileTwo = game.tileTwo
      :timer.sleep(1000);

      present = List.replace_at(game.present, tileOne, nil)

      newPresent = List.replace_at(present, tileTwo, nil)

      game 

      |> Map.put(:tileOne, nil)

      |> Map.put(:tileTwo, nil)

      |> Map.put(:present, newPresent)

      |> Map.put(:click_disabled, false)

    end
  end

  def restart(game) do

    new()

  end



  def initiateLst() do

    letters = ["A", "B", "C", "D", "E", "F", "G", "H"]

    Enum.shuffle(letters ++ letters)

  end

	

  def initiatepre() do

    List.duplicate(nil, 16)

  end

end
