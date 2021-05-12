export function formatDateWithTimeToString(dateStringWithTime){
    return dateStringWithTime?.split('T')[0];
}

export function formatTimeToString(dateStringWithTime){
    return dateStringWithTime?.split('T')[1]?.split('.')[0];
}

export function formatDateWithTimeToStringPretty(dateStringWithTime){
    var dateString = formatDateWithTimeToString(dateStringWithTime);
    var dateArr = dateString.split('-');
    return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
}

export function formatDateToString(date){
    var day = date.getDate().toString(); 
    var month = (date.getMonth() + 1).toString();

    var dd = day.padStart(2, '0');
    var mm = month.padStart(2, '0');

    return date.getFullYear() + '-' + mm + '-' + dd;
}

export function formatStringToDate(dateString){
    var dateArr = dateString.split('-');
    return new Date(dateArr[0], parseInt(dateArr[1]) - 1, dateArr[2]);
}

export function getMonthFromStringDate(dateString){
    var dateArr = dateString.split('-');
    return parseInt(dateArr[1]);
}

export function getYearFromStringDate(dateString){
    var dateArr = dateString.split('-');
    return parseInt(dateArr[0]);
}

export function addDays(date, days){
    date.setDate(date.getDate() + days);
}

