import React, { useEffect, useState } from 'react';
import Style from "./card.module.css"
import { BiMailSend } from 'react-icons/bi';
import { LiaStar } from 'react-icons/lia';


export const Card = (props) => {

    // const [id, setId] = useState("")
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (props.data.relationships.books && props.data.relationships.books.data.length > 0) {
            const bookIds = props.data.relationships.books.data.map(item => parseInt(item.id, 10)); // Convert to numbers
            const fetchBooks = async () => {
                const bookDetails = await Promise.all(bookIds.map(id => fetch(`http://localhost:3000/books/${id}`).then(resp => resp.json())));
                console.log("Fetched book details:", bookDetails);
                setDetails(bookDetails);
                // console.log("Updated details state:", details);
            };

            fetchBooks();
        }
    }, [props.data.relationships.books]);

    function Stars() {
        const rate = props.data.attributes.rating;
        const stars = [];
        for (let i = 0; i < rate; i++) {
            stars.push(<LiaStar key={i} style={{ color: "orange"}} />);
        }
        for (let i = rate; i < 5; i++) {
            stars.push(<LiaStar key={i} style={{ color: "black" }} />);
        }
        return <div>{stars}</div>;
    }


    return (
        <div>
            {console.log("this is props,", props.data.attributes)}
            <div className={Style["upper"]}>
                <div className={Style["left"]}>
                    <img className={Style["img"]} src={props.data.attributes.storeImage} alt="img" />
                </div>
                <div className={Style["right"]}>
                    <div className={Style["store-name"]}>
                        <h1>{props.data.attributes.name}</h1>
                        <div>
                            <Stars />
                        </div>
                    </div>
                    <div className={Style["tab"]}>
                        <h2 style={{ margin: "0px", border: "0.99px solid black" }}>Top Selling Books</h2>

                        {props.data.relationships.books && props.data.relationships.books.data.length > 0 ? (
                            <table className={Style["tablee"]}>
                                <tbody>
                                    {props.data.relationships.books.data.map((item) => {
                                        const bookDetail = details.find(detail => detail.data.id === item.id);
                                        return (
                                            <tr key={item.id}>
                                                <td>{bookDetail ? bookDetail.data.attributes.name.slice(11) : 'Loading...'}</td>
                                                <td>{bookDetail ? bookDetail.data.attributes.copiesSold : 'Loading...'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        ) : (
                            <table className={Style["tablee"]}>
                                <tbody>
                                    <tr>
                                        <td>N/A</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div className={Style["lower"]}>
                <div className={Style['lower-left']}>
                    <div className='date'>{props.data.attributes.establishmentDate.slice(0, 10)}</div>

                    <div className='web-link'>{
                        <a href={props.data.attributes.website} style={{ textDecoration: "none" }}>{props.data.attributes.website.slice(8)}</a>
                    }</div>

                </div>
                <div className='lower-right'>
                    <BiMailSend className={Style['icon']} />
                </div>
            </div>

        </div>
    );
}
