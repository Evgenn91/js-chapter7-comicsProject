import { Component } from 'react';
import MarvelService from '../../services/MarverService';
import PropTypes  from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        //ставим false потомучто загрузка должна пойти  только после как пользвователь нажмет кнопку
        loading: false,
        error: false
    }

    marverService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    //он получает при вызове предыдущие состояния props and state(state не использовали(он призодит вторым аргументом))
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }

    }

    // не нуженБ мы будем использовать предохранитель
    // componentDidCatch(err, info){
    //     this.setState({error: true});
    // }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) { return; }

        this.onCharLoading();
        this.marverService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

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

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;



        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )

    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                { comics.length>0 ? null : 'There is not comics with this character'}
                {
                    comics.map((item, i) => {
                        //лучше не использоватьЮ когда данных много(тогда лучше использовать обычный цикл и break)
                        if(i>10) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    //говорим что charId должен быдь числом
    charId: PropTypes.number
}

export default CharInfo;