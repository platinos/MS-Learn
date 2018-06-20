export interface testFile {
    questionPaperDetails: {
        id: string,
        title: string,
        class: string,
        time: string,
        subject: string,
        marks: string,
        date: string
    },
    questions: [
        {
            question_id: string,
            section: number,
            ques_txt: string ,
            options: {
                option1: string,
                option2: string,
                option3:string,
                option4: string,
                option5: string
            },
            marks: number,
            ques_img: string,
            answer: string,
            qr: string
        }
    ]
}