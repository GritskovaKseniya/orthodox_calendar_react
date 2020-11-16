import React, {useState, useEffect} from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date())
    const [texts, setTexts] = useState<string>("");

    const formatDate = (date: Date): string => {
        let day: string = date.getDate() < 10 ?
            "0" + date.getDate().toString()
            : date.getDate().toString();
        let month: string = date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString();
        let year: string = date.getFullYear().toString();

        return [year, month, day].join('-')
    }

    useEffect(() => {
        fetch('https://azbyka.ru/days/api/day/' + formatDate(date) + '.json')
            .then((res: Response) => res.json())
            .then((json) => setTexts(json.texts[0].text))
            .catch(console.log)
    }, [date])

    return (
        <div className="App">
            <Calendar value={date} onChange={setDate as any}/>
            <span dangerouslySetInnerHTML={{__html: texts}}></span>
        </div>
    );
}

export default App;