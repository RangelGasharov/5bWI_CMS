export type HomeworkType = {
    id: number,
    created_at: Date,
    short_description: string,
    subject_fk: number,
    content: string
}