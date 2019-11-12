export interface Vacancy {
    id:number
    position:string
    description:string
    salary: number
    images: Images[]
    images_files: File[]
}
export interface Images {
    id: number
    original: string
    small: string
    vacancy_id: number
}