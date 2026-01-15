export const format_date = (date_param: string) => {
    return Intl.DateTimeFormat("es-MX", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date_param));
}