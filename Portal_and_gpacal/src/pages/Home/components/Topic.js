import topic from '../images/Topic.png'
import gpacal from '../images/gpacal.png'
import './Topic.css'
import Content from './Content'
import geGuide from '../images/geGuide.png'
import subjectMatch from '../images/subjectMatch.png'
import forum from '../images/forum.png'

const Topic = () => {
  return (
    <div className="home-page-container" >
      <div className='content-container'>
        <Content 
          imagesDirection = 'left'
          topic='HKCC 資訊指南'
          introText= {<p>提供各種非官方資訊<br/>並且提供各種工具<br/>方便學生在HKCC的生活</p>}
          images={topic}/>
      </div>

      <div id="page-intro-content">
        <div className='content-container'>
          <Content 
            imagesDirection = 'right'
            topic='DS/GE 科目評價'
            introText= {<p>HKCC DS/GE 評價提供一個平台，讓學生能查看HKCC科目資訊<br/>同時學生亦能給予課程評價</p>}
            images={geGuide}/>

          <Content 
            imagesDirection = 'left'
            topic='時間表計劃工具'
            introText= {<p>學生可透過此工具預先計劃時間表內容</p>}
            images={gpacal}/>

          <Content 
            imagesDirection = 'right'
            topic='科目匹配系統'
            introText= {<p>學生可以透過此平台，提前知道有沒有其他需要轉科/轉班的人</p>}
            images={subjectMatch}/>
            
          <Content 
            imagesDirection = 'left'
            topic='GPA 計算器'
            introText= {<p>學生可透過此工具計算semster GPA與計算目標CGPA</p>}
            images={gpacal}/>

          <Content 
            imagesDirection = 'right'
            topic='HKCC 論壇'
            introText= {<p>學生可透過此論壇交換資訊</p>}
            images={forum}/>
        </div>
      </div>
    </div>
    
  )
}

export default Topic