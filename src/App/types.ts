export interface calendarData {
    texts: string;
    saintIconUrl?: string;
    liturgicalInstructions?: string;
}

export interface azbykaDaysResponse {
    saints: {
        id: number;
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
