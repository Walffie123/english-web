import axios from 'axios';
import { useEffect, useState } from 'react';
// import styles from './Upload.module.scss';
import { Container, Paper } from '@mui/material';

// const cx = classNames.bind(styles);

function Upload() {
    // const fileReader = new FileReader();
    const [videoURL, setUrl] = useState('');
    const uploadFileHandler = (e) => {
        setUrl(e.target.files[0]);
        console.log(videoURL);
    };
    const [videos, setVideos] = useState([]);

    const fileSubmitHandler = (event) => {
        event.preventDefault();
        // fileReader.onload = () => {
        const formData = new FormData();
        formData.append('multipartFile', videoURL);
        console.log(videoURL);
        axios.post('//localhost:8080/cloudinary/upload/5', formData);
        // };
    };

    useEffect(() => {
        axios
            .get('//localhost:8080/cloudinary/list')
            .then(function (result) {
                setVideos(result.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    const deleteVideo = (id) => {
        axios.delete('//localhost:8080/cloudinary/delete' + '/' + id);
    };

    return (
        <div>
            <div>
                <div className="App">
                    <form onSubmit={fileSubmitHandler}>
                        <input type="file" onChange={uploadFileHandler} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
                {/* <div className="App">
                {console.log(videos.data)} */}

                {/* </div> */}
            </div>

            <Paper key={videos.id}>
                        <button onClick={() => deleteVideo(videos.id)}>Delete</button>
                        <br />
                        ID: {videos.id} <br />
                        Name: {videos.videoname} <br />
                        <video
                            controls
                            controlsList="nodownload"
                            crossorigin
                            playsinline
                            id="player"
                            src={videos.videoURL}
                        ></video>
                        {/* <DefaultPlayer>
                            <source src={v.videoURL} type="video/webm" />
                        </DefaultPlayer> */}
                    </Paper>
        </div>
    );
}

export default Upload;
