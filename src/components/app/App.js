import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar:null
    }

    //метод установки персонажа
    //устанавливаем свойство с помощью аргумента
    onCharSelected = (id) =>{
        this.setState(
            {selectedChar:id}
        )
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        {/* //сюда передаем функцию, с помощью которой получим id */}
                        <ErrorBoundary>
                            <CharList onCharSelected = {this.onCharSelected}/>
                        </ErrorBoundary>
                        {/* //сюда передаем id, который получим из CharList */}
                        <ErrorBoundary>
                            <CharInfo charId = {this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;