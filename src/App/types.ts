export interface calendarData {
    texts: string;
    iconUrls: string[]
    saints: string[];
    liturgicalInstructions: string;
}

export interface azbykaDaysResponse {
    saints: {
        type_of_sanctity?: string;
        title_genitive: string;
        church_title_genitive?: string;
        suffix: string;
        prefix: string;
        priority: number;
        imgs: {
            saint_id: number;
            image: string;
        }[];
    }[] | { item: ''; };

    ikons: {
        imgs: {
            icon_of_our_lady_id: number
            img: string;
        }[];
    }[] | { item: ''; };

    texts: {
        text: string;
    }[];

    holidays: {
        title: string;
        imgs: {
            holiday_id: number;
            image: string;
        }[]
    }[] | { item: ''; };
}
