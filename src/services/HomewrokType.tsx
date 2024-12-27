export type HomeworkType = {
    id: number,
    created_at: string,
    due_date: string,
    short_description: string,
    subject_fk: number,
    content: string
}