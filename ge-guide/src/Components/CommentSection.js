import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./CommentSection.css";
import { Grid } from '@material-ui/core/'


export default function CommentSection({ code }) {
    let newCommentPath = "/commentform/";
    let APIPath = "http://localhost:3004/Comments?subjectCode=";

    const urlFetch = APIPath.concat(code).concat("&courseRate_ne=null");
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [CommentData, setCommentData] = useState([]);
    const [isDataLoading, setIsDataLoaded] = useState(true);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    useEffect(() => {

        const fetchCommentData = async () => {
            // get the data from the api
            const data = await fetch(urlFetch);
            // convert the data to json
            const json = await data.json();
            setCommentData(json);
            setIsDataLoaded(false);
        }
        fetchCommentData().catch(console.error);;
    }, []);


    return (
        isDataLoading ? <div><p>數據加載中...</p></div> : (
            <div>
                {<div className='linktofill'>你讀過此科目嗎？歡迎你<Link to={newCommentPath.concat(code)}>留下評論</Link>。</div>}
                {
                    (Object.values(CommentData) === null || typeof Object.values(CommentData) === 'undefined') && <div><p>非常抱歉，暫時未有人提供{code}的評論。或者你願意<Link to={newCommentPath.concat(code)}>寫下第一條評論</Link>嗎？</p></div>
                }
                <div className='commentPart'>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        {
                            CommentData !== null &&
                            Object.values(CommentData).map((postData) => {
                                //if (postData.courseRate !== null && typeof (postData.courseRate) !== "undefined") {
                                console.log(postData.courseRate);
                                return (
                                    <div className='comment'>
                                        <Grid item xs={3} sm={6} md={9}>
                                            <Card key={postData.commentID}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                            {postData.grade}
                                                        </Avatar>
                                                    }
                                                    title="匿名"
                                                    subheader={postData.createdTime}
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        學期：{postData.teachingTerm}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        課程評分：{postData.courseRate}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        工作量評分：{postData.workloadRate}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        導師編號：{postData.lecturerID}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        導師評分：{postData.lecturerRate}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        最後更新日期：{postData.lastUpdateTime}</Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <IconButton aria-label="share">
                                                        <ShareIcon />
                                                    </IconButton>
                                                    <ExpandMore
                                                        expand={expanded}
                                                        onClick={handleExpandClick}
                                                        aria-expanded={expanded}
                                                        aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                                </CardActions>
                                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography>課程詳情評價</Typography>
                                                        <Typography paragraph>
                                                            {postData.courseContent}
                                                        </Typography>
                                                        <Typography >
                                                            導師評價
                                                        </Typography>
                                                        <Typography paragraph>
                                                            {postData.lecturerContent}
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </Card>
                                        </Grid>
                                    </div>
                                )
                            }
                            )
                        }</Grid>
                </div>

            </div>)
    );
}