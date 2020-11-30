export interface calendarData {
    texts: string;
    saintIconUrl?: string;
    saints: string[];
    liturgicalInstructions?: string;
}

export interface azbykaDaysResponse {
    saints: {
        id: number;
        type_of_sanctity: string;
        title_genitive: string;
        church_title_genitive?: string;
        suffix: string;
        imgs: {
            image: string;
        }[];
    }[] | { item: ''; };

    ikons: {
        id: number;
        imgs: {
            img: string;
        }[];
    }[] | { item: ''; };

    texts: {
        text: string;
    }[];
}
