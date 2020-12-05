import React, {useState, useEffect} from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getData } from './functions';
import { calendarData } from './types';
import {uniqueId} from 'lodash'

function App(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date())
    const [data, setData] = useState<calendarData>({
        texts: '',
        saints: [],
        iconUrls: [],
        liturgicalInstructions: '',
    });
    // useState to ensure that carouselId will be generate only once
    const [carouselId] = useState<string>(uniqueId('react-calendar-carousel-'))

    // Get GET-params as JS object
    let params = JSON.parse(
        '{"' + window.location.search.slice(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}',
        function(key, value) { return key===""?value:decodeURIComponent(value)}
    )

    let keys = Object.keys(params)

    useEffect(() => {
        getData(date)
            .then((data: calendarData) => setData(data))
    }, [date])

    return (
        <div className='App container'>
            <Calendar value={date} onChange={(date) => setDate(date as Date)}/>
            {
                keys.includes('ikons')
                && <div className='carousel slide' data-ride='carousel' id={carouselId}>
                    <div className="carousel-inner">
                        {data.iconUrls.map((url: string, idx: number) =>
                            <div key={url} className={'carousel-item' + (idx === 0 ? ' active' : '')}>
                                <img src={url} className='d-block w-100' alt='' />
                            </div>
                        )}
                    </div>
                    <a className='carousel-control-prev' href={`#${carouselId}`} role='button' data-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Previous</span>
                    </a>
                    <a className='carousel-control-next' href={`#${carouselId}`} role='button' data-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Next</span>
                    </a>
                </div>
            }
            {
                keys.includes('saints')
                &&   <span>{data.saints.join('; ')}</span>
            }
            {
                keys.includes('texts')
                && <span dangerouslySetInnerHTML={{__html: data.texts}}></span>
            }
            {
                keys.includes('instructions')
                && <details>
                    <summary>Богослужебные указания</summary>
                    <span dangerouslySetInnerHTML={{__html: data.liturgicalInstructions}}></span>
                </details>
            }
        </div>
    );
}

export default App;
