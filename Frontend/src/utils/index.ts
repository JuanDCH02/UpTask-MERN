
export function formatDate(str:string){
    const date = new Date(str)
    const formatter = new Intl.DateTimeFormat('es-ES',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return formatter.format(date)
}