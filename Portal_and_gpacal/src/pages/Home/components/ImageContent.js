import './ImageContent.css'


const ImageContent = (props) => {
  return (
    <div className="image-column">
      <div className="image-column-content">
        <img src={props.images}></img>
      </div>
    </div> 
  )
}

export default ImageContent