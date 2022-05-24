import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarverService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



class RandomChar extends Component {

    // constructor(props) {
    //     super(props);
    //     //так нельзя делать, тк конструктор вызывается раньше чем строится верстка
    //     //а мы в этом методе получается сначала работаем с пустым состоянием
    //     //тоесть делать запросы во время конструирования не стоит
    //     //поместим этот вызов в метод hook: componentDidMount
    //     // this.updateChar();
    // }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marverService = new MarvelService();

    //специальный метод hook, в которые лучше помещать ф-ции обновления информации
    componentDidMount(){
        this.updateChar();
        //это чтобы рандомный персонаж каждые 3 секунды сам менялся
        // this.timerId = setInterval(this.updateChar,3000);
    }

    // componentWillUnmount(){
    //     clearInterval(this.timerId);
    // }

    //как только данные загрузятся, loading становится в положение false
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    //сделал этот метод, который запускает в работу при нажатии кнопки
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    //если при загрузке данных произошла ошибка
    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marverService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    // marverService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        //тоесть до этого return мы не доедем, если выполнится условие
        // if (loading) {
        //     return <Spinner />
        // }

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        );
    }
}

//создадим компонент, который будет отображать кусок нашей верстки
//это компонент, в котором нет никакой логики
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;