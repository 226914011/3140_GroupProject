import './TextContent.css'

const TextContent = (props) => {
  return (
  <div className="text-column">
    <div className="text-column-content">
      <h1>{props.topic}</h1>
      {props.introText}
    </div>
  </div>
  )
}

export default TextContent