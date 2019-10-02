import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root,channel) {
  ReactDOM.render(<Board channel={channel} />, root);
}

function Square(props) {
    let tile;
    if (props.hidden){
      tile = null;
    }else {
      tile = props.letter;
    } 
    return (
      <button 
        className="square"
        onClick={() => props.onClick()}
      >
        {tile}
      </button>
    );
  }


class Board extends React.Component{
  constructor(props) {
    super(props);
    this.channel = props.channel;
    //setup initial state
    this.state = {
	    tileOne:  null,
	    tileTwo: null,
	    letters: [],
	    present: [], 
	    clicks: 0, 
	    click_disabled: false

    };
    this.channel
	.join()
	.receive("ok",this.got_view.bind(this))
	.receive("error",resp =>{console.log("Unable to join",resp);});  
  }

  got_view(view){
    console.log("new view",view);
    this.setState(view.game);
  }

  
 
  
  // restart game.
  restart(){
    this.channel.push("restart",{})
	        .receive("ok", this.got_view.bind(this));
  }

  handleClick(i){
    //click situation
    if (!this.state.click_disabled){
      this.channel.push("click",{index:i})
		  .receive("ok", this.got_view.bind(this));
    } 
  }

  renderSquare(i) {
    if (this.state.present[i]==null){
    	return <Square 
            value={i} letter={this.state.letters[i]} hidden={true} 
            onClick={()=>this.handleClick(i)}
               />;
    }else {
	return <Square 
            value={i} letter={this.state.letters[i]} hidden={false} 
            onClick={()=>{return;}}
               />;
    }
  }

  render(){
    if (this.state.tileOne != null && this.state.tileTwo != null){
		this.channel.push("check_match",{})
	                    .receive("ok", this.got_view.bind(this));
	}
    let clicks_num = this.state.clicks;
    	return (
	<div className="main">
	  <p>clicks: {clicks_num}</p>
	  <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
	    {this.renderSquare(11)}
	  </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
          <div>
            <button className="restart" 
		onClick = {()=>this.restart()}>
		Restart
	    </button>
          </div>
       </div>
    );
	}


}

