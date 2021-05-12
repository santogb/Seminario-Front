export function isNullOrEmpty(value){
    return value === null || value === undefined || value === "";
}

export async function validateRequired(value) { 
    return !isNullOrEmpty(value);
}