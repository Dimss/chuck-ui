import React from 'react';
import './App.css';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        if (process.env.REACT_APP_PROFILE === 'dev') this.API = "http://127.0.0.1:8080";
        else this.API = window.API_URL;
        this.state = {joke: '', translated: ''};
        this.onJokeClick();
    }

    getSelectedText = () => {
        let selection = window.getSelection().toString();
        if (selection.length > 0) {
            fetch(`${this.API}/v1/translate/${selection}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        translated: data.data
                    });
                });
        }
    };

    onJokeClick = () => {
        this.setState({translated: ''});
        fetch(`${this.API}/v1/joke`)
            .then((response) => {
                return response.json();
            })
            .then((jokeObj) => {
                this.setState({
                    joke: jokeObj.data.joke
                });
            });
    };

    render() {
        return (
            <div>
                <div className="area">
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div
                    className="context"
                    style={{textAlign: "center"}}>
                    <h1 onMouseUp={this.getSelectedText}>
                        {this.state.joke}
                    </h1>
                    <a onClick={this.onJokeClick} className="btn cta">Next</a>
                    {/*<a onClick={this.onJokeClick} className="btn cta">Like</a>*/}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {/*<p style={{color: "white", fontWeight: "bold"}}>Likes: <span className="glyphicon glyphicon-thumbs-up"></span> 1241</p>*/}
                    <h1>
                        {this.state.translated}
                    </h1>
                </div>
            </div>
        )
    };
}


