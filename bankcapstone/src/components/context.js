import React from 'react';
import Card from 'react-bootstrap/Card';
import './context.css';
const UserContext = React.createContext(null);

 
function CardBootstrap(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3' + bg + txt;
    }

    return (
      <Card className={classes()} style={{width: props.cardWidth, backgroundColor: props.backgroundColor}}>
        <Card.Header className="card-header">{props.header}</Card.Header>
        <Card.Body className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </Card.Body>
      </Card>      
    );    
  }
  
const contextExports = {
  CardBootstrap,
  UserContext
}
export default contextExports;