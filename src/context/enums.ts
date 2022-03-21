export enum ActionTypes {
  TOGGLEFLAG = 'TOGGLEFLAG',
  MINECLICK = 'MINECLICK',
  NEWGAME = 'NEWGAME',
  LEVELCHANGE = 'LEVELCHANGE',
  EMPTYCELLCLICKED = 'EMPTYCELLCLICKED',
  CELLWITHVALUECLICKED = 'CELLWITHVALUECLICKED',
  GAMEPAUSED = 'GAMEPAUSED',
  GAMERESTORED = 'GAMERESTORED',
}

export enum LevelOptions {
  Easy,
  Intermediate,
  Expert,
}

export enum GameStatus {
  Active,
  Win,
  Fail,
  Paused,
}
