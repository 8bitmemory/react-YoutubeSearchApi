import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YouTubeSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyBqc4kabmMni1F0c4sFd6_GX1B7Cc-gsMQ';

class App extends React.Component {
    constructor (props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };
        
        this.videoSearch('Surfboards');
    }

    videoSearch(term) {
        YouTubeSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) },400);
        
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
    
}

ReactDOM.render(<App></App>, document.querySelector('.container'))