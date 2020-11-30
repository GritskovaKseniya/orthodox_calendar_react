import { azbykaDaysResponse, calendarData } from "./types";

const baseAzbykaAPIURL: string = 'https://azbyka.ru/days/api'
const baseAzbykaAssetesURL: string = 'https://azbyka.ru/days/assets/img'

export const formatDate = (date: Date): string => {
    let day: string = date.getDate() < 10 ?
        "0" + date.getDate().toString()
        : date.getDate().toString();
    let month: string = date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    let year: string = date.getFullYear().toString();

    return [year, month, day].join('-')
}

export async function getData(date: Date):Promise<calendarData> {
    let data: calendarData = {
        texts: ''
    };

    await Promise.allSettled([
        fetch(`${baseAzbykaAPIURL}/day/${formatDate(date)}.json`)
            .then((resp: Response) => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    Promise.reject()
                }
            })
            .then((json: azbykaDaysResponse) => {
                data.texts = json.texts[0].text
                if (json.saints instanceof Array) {
                    data.saintIconUrl = `${baseAzbykaAssetesURL}/saints/${json.saints[0].id}/${json.saints[0].imgs[0].image}`
                }
                
            })
            .catch(console.log),
        fetch(`http://${window.location.hostname}:8080/wp-content/get-bu.php?date=${formatDate(date)}`)
            .then((resp: Response) => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    Promise.reject()
                }
            })
            .then(json => data.liturgicalInstructions = json.data)
            .catch(console.log)
    ])

    return data;    
}
