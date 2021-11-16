class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("violet");
    fill(0)
    textSize(22)
    text("¡¡RESULTADOS DEL CUESTIONARIO!!",250,70)
    Contestant.getPlayerInfo()

    if (allContestants !== undefined){
      debugger;
      var display_answers=230;
      fill("Green");
      textSize(22);
      text(">*El concursante que haya respondio correctamente el cuestionario", 80,230);
      text("resaltara su nombre  de color verde",240,255)
    
      for(var plr in allContestants){
        debugger;
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
          fill("Green");
        else
          fill("red");

          display_answers+=60;
          textSize(30);
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 500,display_answers)
      }
    }
  }
}
