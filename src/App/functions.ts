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
        texts: '',
        saints: [],
        iconUrls: [],
        liturgicalInstructions: '',
    };

    const HTMLTagsRegExp = new RegExp('</?.*>', 'g')

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
                
                if (json.holidays instanceof Array) {
                    let holidaysIconUrls: string[] = [];
                    json.holidays.forEach(
                        holiday => {
                            if (holiday.imgs){
                                holiday.imgs.forEach(
                                    img => holidaysIconUrls.push(
                                        `${baseAzbykaAssetesURL}/holidays/${img.holiday_id}/${img.image}`
                                    )
                                )
                            }
                        }
                    );
                    data.iconUrls = data.iconUrls.concat(holidaysIconUrls);
                }

                if (json.saints instanceof Array) {
                    let saintIconUrls: string[] = [];
                    json.saints.forEach(
                        saint => saint.imgs.forEach(
                            img => saintIconUrls.push(
                                `${baseAzbykaAssetesURL}/saints/${img.saint_id}/${img.image}`
                    )));
                    data.iconUrls = data.iconUrls.concat(saintIconUrls);

                    data.saints = json.saints.map(saint => (
                        saint.prefix
                            + (saint.type_of_sanctity ? saint.type_of_sanctity : '')
                            + ' '
                            + saint.title_genitive
                            + ', '
                            + (saint.church_title_genitive ? saint.church_title_genitive : '')
                            + saint.suffix)
                        .replaceAll(HTMLTagsRegExp, '')
                    );
                }

                if (json.ikons instanceof Array) {
                    let iconIconUrls: string[] = [];
                    json.ikons.forEach(
                        icon => icon.imgs.forEach(
                            img => iconIconUrls.push(
                                `${baseAzbykaAssetesURL}/icons/${img.icon_of_our_lady_id}/${img.img}`
                    )));
                    data.iconUrls = data.iconUrls.concat(iconIconUrls);
                }
            })
            .catch(console.log),
        fetch(`http://${window.location.hostname}:8080/wp-content/get-bu.php?date=${formatDate(date)}`)
            .then((resp: Response) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    Promise.reject();
                }
            })
            .then(json => data.liturgicalInstructions = json.data.replaceAll('\n', '<br />'))
            .catch(console.log)
    ])

    return data;    
}
