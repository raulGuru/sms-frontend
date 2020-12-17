export interface Contact {
    id: number,
    name: string,
    mobile: string,
    email: string,
    city: string,
    state: string,
    tags: Array<string>,
    fields: Array<fieldsArr>
}

interface fieldsArr {
    field: string,
    value: string
}