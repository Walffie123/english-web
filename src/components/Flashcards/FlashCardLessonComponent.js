import { FlashcardArray } from 'react-quizlet-flashcard';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faEye, faLightbulb, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './FlashCard.module.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function FlashCardLessonComponent(props) {
    const [cards, setCards] = useState([]);
    const [starredIds, setStarredIds] = useState([]);
    const [unStarredIds, setUnStarredIds] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [currentCard, setCurrentCard] = useState(1);
    const [currentStarredCard, setCurrentStarredCard] = useState(1);
    const [starredCards, setStarredCards] = useState([]);
    const [loadStarredCards, setLoadStarredCards] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    // const [clickStar, setClickStar] = useState(false);
    const controlRef = useRef({});
    const { lessonid } = useParams();

    useEffect(() => {
        loadCards(lessonid);
    }, [shuffle, loadStarredCards]);
    const loadCards = async (lessonid) => {
        const result = await axios.get(`http://localhost:8080/loadFlashCard/${lessonid}`);
        const newCards = result.data.map((card, index) => ({
            frontHTML: (
                <div>
                    <h3> {card.frontHTML}</h3>
                </div>
            ),
            backHTML: (
                <div>
                    <h3>{card.backHTML}</h3>
                </div>
            ),

            id: index + 1,
        }));
        // console.log(newCards);
        if (loadStarredCards === true) {
            let filteredCards = newCards;
            if (starredIds.length >= 0) {
                filteredCards = newCards.filter((card) => starredIds.includes(card.id));
            }
            setStarredCards(filteredCards);
            controlRef.current.resetArray();
        } else {
            setCards(newCards);
            controlRef.current.resetArray();
        }
        if (shuffle) {
            newCards.sort(() => Math.random() - 0.5);
        }
    };

    const handleShuffleClick = () => {
        setShuffle(!shuffle);
    };

    const handleStarClick = (id) => {
        if (starredIds.includes(id)) {
            const newStarredIds = starredIds.filter((starredId) => starredId !== id);
            setStarredIds(newStarredIds);
        } else {
            setStarredIds([...starredIds, id]);
        }
        // setClickStar(!clickStar);
    };
    console.log(starredIds);
    // starredCards.map((card) => console.log(card.id));
    console.log(currentStarredCard);

    const handleLoadStarredCards = () => {
        console.log('loadStarredCards: ' + loadStarredCards);
        setLoadStarredCards(!loadStarredCards);
    };

    const handleDeleteStarredCards = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete all starred cards?');
        if (confirmDelete) {
            setStarredIds([]);
            setIsDelete(!isDelete);
            if (loadStarredCards) {
                setLoadStarredCards(!loadStarredCards);
            }
        }
    };

    return (
        <div className={cx('fl-container')}>
            <div className={cx('row', 'flashcard')}>
                {!loadStarredCards && (
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <div
                                className="col-12"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FlashcardArray
                                    cards={cards}
                                    frontContentStyle={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    backContentStyle={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onCardChange={(id, index) => {
                                        setCurrentCard(id);
                                        console.log('Current: ' + id);
                                    }}
                                    forwardRef={controlRef}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div
                                className="row"
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <div className="col-md-3">
                                    <div
                                        style={{
                                            color: shuffle ? 'orange' : 'black',
                                        }}
                                    >
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="shuffle">Shuffle</Tooltip>}
                                        >
                                            <span>
                                                <FontAwesomeIcon icon={faShuffle} onClick={handleShuffleClick} />
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <div
                                            style={{
                                                color: starredIds.includes(currentCard) ? 'orange' : 'black',
                                            }}
                                        >
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id="star">Remember this card</Tooltip>}
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faLightbulb}
                                                        onClick={() => handleStarClick(currentCard)}
                                                    />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="star">Show starred card</Tooltip>}
                                        >
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    onClick={handleLoadStarredCards}
                                                    style={{ color: loadStarredCards ? 'orange' : 'black' }}
                                                />
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="star">Delete all starred card</Tooltip>}
                                        >
                                            <span>
                                                <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteStarredCards} />
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loadStarredCards && (
                    <div className="col-md-12">
                        <div
                            className="col-12"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FlashcardArray
                                cards={starredCards}
                                frontContentStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                backContentStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onCardChange={(id, index) => {
                                    setCurrentStarredCard(id);
                                    console.log('Starred: ' + id);
                                }}
                                forwardRef={controlRef}
                            />
                        </div>
                        <div className="col-md-12">
                            <div
                                className="row"
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <div className="col-md-4">
                                    <div
                                        style={{
                                            color: shuffle ? 'orange' : 'black',
                                        }}
                                    >
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="shuffle">Shuffle</Tooltip>}
                                        >
                                            <span>
                                                <FontAwesomeIcon icon={faShuffle} onClick={handleShuffleClick} />
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <div>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id="star">Delete all starred card</Tooltip>}
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faTrashCan}
                                                        onClick={handleDeleteStarredCards}
                                                    />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="star">Show full card</Tooltip>}
                                        >
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    onClick={handleLoadStarredCards}
                                                    style={{ color: loadStarredCards ? 'orange' : 'black' }}
                                                />
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
