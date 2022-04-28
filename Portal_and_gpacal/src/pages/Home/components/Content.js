import ImageContent from "./ImageContent"
import TextContent from "./TextContent"
import './Content.css'

const Content = (props) => {
  // const TextContent = () => <div className="text-column"><div className="text-column-content"><h1>{props.topic}</h1>{props.introText}</div></div>
  // const ImageContent = () => <div className="image-column"><div className="image-column-content"><img src={props.images}></img></div></div>
  var firstElement
  var secondElement

  function setContent() {
    switch (props.imagesDirection) {
      case 'left':
        firstElement = <TextContent topic={props.topic} introText={props.introText}/>;
        secondElement = <ImageContent images={props.images}/>;
      break;
      
      case 'right':
        firstElement = <ImageContent images={props.images}/>;
        secondElement = <TextContent topic={props.topic} introText={props.introText}/>;
      break;
    
      default:
        break;
    }
  }


  return (
    <div className="display-content" >
      {setContent()}
      {firstElement}
      {secondElement}

    </div>
  )
}

export default Content