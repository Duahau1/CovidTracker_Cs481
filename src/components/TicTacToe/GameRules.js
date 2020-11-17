import React from 'react';
import { Grid, Card, IconButton, Tooltip } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown, Close, Help } from '@material-ui/icons';
import './GameRules.css';

export const GameRules: React.FunctionComponent = () => {
  const [minimized, setMinimized] = React.useState(false);
  const [closed, setClosed] = React.useState(false);

  const handleClick = () => {
    setMinimized(!minimized);
  };
  const handleClose = () => {
    setClosed(!closed);
  }

  if (closed) {
    return (
      <Grid className={"helpContainer"}>
        <Tooltip title="Game Rules">
          <IconButton className={"help"} onClick={handleClose}><Help/></IconButton>
        </Tooltip>
      </Grid>
    );
  }

  if (!minimized) {
    return (
      <Grid item>
        <Card id="rules">
          <Tooltip title="Close Rules">
            <IconButton className={"close"} onClick={handleClose}><Close/></IconButton>
          </Tooltip>
          <p className={"playTitle header"}>HOW TO PLAY:</p>
          <p className="rule">
            <b className="number">
              1.&nbsp;
            </b>
            Each small tic-tac-toe board is called an <b>&quot;inner game&quot;</b>
            &nbsp;and the game as a whole is referred to as the <b>&quot;outer game&quot;</b>.
          </p>
          <p className="rule">
            <b className="number">
              2.&nbsp;
            </b>
            X goes first in any of the 81 spots. This move <b>&quot;sends&quot;</b>
            &nbsp;their opponent to its relative location.
          </p>
          <p className="rule">
            <b className="number">
              3.&nbsp;
            </b>
            If a move is to win an inner game, then it is marked as a victory for
            that player and contributes as a &quot;move&quot; for that player in
            the outer game.
          </p>
          <p className="rule">
            <b className="number">
              4.&nbsp;
            </b>
            When an inner game is won or there are no more moves left, the game
            becomes disabled and can no longer be played in.
          </p>
          <p className="rule">
            <b className="number">
              5.&nbsp;
            </b>
            Given a player is &quot;sent&quot; to a game that is disabled, this
            allows the player to go in any of the open games-- a <b>&quot;free
            move&quot;</b>.
          </p>
          <hr className="horizontalRule"/>
          <p className="playTitle">HOW TO WIN:</p>
          <p className="rule">
            The game ends when either a player wins the outer game by marking 3
            inner game wins in a row, or there are no legal moves left, in which
            case the game is a tie.
          </p>
          <Grid container justify={'center'} alignItems={'center'}>
            <Tooltip title="Minimize Rules">
              <IconButton className={"expand"} onClick={handleClick}>
                <KeyboardArrowUp/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Card>
      </Grid>
    );
  } else {
    return (
      <Grid item>
        <Card id="rules">
          <Tooltip title="Close Rules">
            <IconButton className={"close"} onClick={handleClose}><Close/></IconButton>
          </Tooltip>
          <p className={"playTitle header"}>HOW TO PLAY:</p>
          <Grid container justify={'center'} alignItems={'center'}>
            <Tooltip title="Expand Rules">
              <IconButton className={"expand"} onClick={handleClick}>
                <KeyboardArrowDown/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Card>
      </Grid>
    )
  }
}
