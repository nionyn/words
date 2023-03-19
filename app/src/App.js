import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import list from "./words.json";
import { PlayFill } from "react-bootstrap-icons";

const getData = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const { data } = await axios.get(url);
    return data[0];
};

const App = () => {
    const [data, setData] = useState();

    const { word, meanings, phonetics } = data ?? {};

    useEffect(() => {
        (async () => {
            const randomWord =
                list.words[Math.floor(Math.random() * list.words.length)];
            setData(await getData(randomWord));
        })();
    }, []);

    const Meaning = ({ partOfSpeech, definitions }) => {
        return (
            <>
                <Row>
                    <Col>{partOfSpeech}</Col>
                </Row>
                <Row>
                    <Col>
                        {definitions.map((item, i) => (
                            <Row>
                                <Col xs="auto">{i + 1}</Col>
                                <Col>{item.definition}</Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </>
        );
    };

    const Pronouciations = () => {
        const Phonetics = ({ i, text, audio }) => {

            const mp3 = new Audio(audio);

            return (
                <>
                    <Row>
                        <Col xs="auto">{i}</Col>
                        <Col>
                            {text} <Button className="ms-2" onClick={() => mp3.play()}><PlayFill /></Button>
                        </Col>
                    </Row>
                </>
            );
        };

        return (
            <>
                <h3>Pronouciations</h3>
                {phonetics?.map((phonetic, i) => (
                    <Phonetics {...phonetic} i={i + 1} />
                ))}
            </>
        );
    };

    const Word = ({ word }) => {
        return <h1>{word}</h1>;
    };

    const Meanings = () => {
        return (
            <>
                <h3>Meanings</h3>
                {meanings?.map((meaning) => (
                    <Meaning {...meaning} />
                ))}
            </>
        );
    };

    if (data)
        return (
            <Row className="align-items-center justify-content-center p-0 m-0 vh-100 w-100">
                <Col sm={12} md={8} lg={6} xl={4}>
                    <Word word={word} />
                    <Pronouciations />
                    <Meanings />
                </Col>
            </Row>
        );
};

export default App;
