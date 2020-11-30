import React, {useState, useEffect} from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getData } from './functions';
import { calendarData } from './types';

function App(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date())
    const [data, setData] = useState<calendarData>({texts: '', saints: []});

    useEffect(() => {
        getData(date)
            .then(data => {
                setData(data)
            })
    }, [date])

    return (
        <div className="App">
            <Calendar value={date} onChange={(date) => setDate(date as Date)}/>
            {data.saintIconUrl ? <img src={data.saintIconUrl} alt='' width='320px' /> : null}
            <span>{data.saints.join('; ')}</span>
            <span dangerouslySetInnerHTML={{__html: data.texts}}></span>
            <details>
                <summary>Богослужебные указания</summary>
                <pre>{data.liturgicalInstructions}</pre>
            </details>
        </div>
    );
}

export default App;
