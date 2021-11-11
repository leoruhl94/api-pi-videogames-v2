const validateText = (value) =>{
    return (typeof value === 'string' && !!value.length)
}
const validateDate = (value) =>{
    return (/^\d{4}([\-\/.])(0?[1-9]|1[0-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(value))
}
const validateNumber = (value, min, max) =>{
    return (typeof value === 'number' && value >= min && value <= max )
}
const validateArray = (value, type) =>{
    if(value instanceof Array && !!value.length){
        let flag = true;
        value.map(x=>{typeof x !== type ? flag = false : true})
        return flag 
    }
    return false;
}
const validateUrl = (value) => {
    return (/^(ftp|http|https):\/\/[^ "]+$/.test(value) && !!value);
}


const validatePostVideogame = ({ name, description, image, rating, released, platforms, genres } ) => {
    let error = [];
    !validateText(name) 
      ? error = [...error, { input: "name", err: "name no puede estar vacio y debe ser tipo string"}] 
      : error = [...error];
    !validateNumber(rating,0,5)
      ? error = [...error, {input: "rating", err:" rating no puede estar vacio y debe ser un numero entre 0 y 5"}] 
      : error = [...error];
    !validateDate(released)
      ? error = [...error, {input: "released", err:"no es una fecha valida"}] 
      : error = [...error];
    !validateText(description)
      ? error = [...error, {input: "description", err:"description no puede estar vacio y debe ser tipo string"}] 
      : error = [...error];
    !validateUrl(image)
      ? error = [...error, {input: "image", err:"image no puede estar vacio y debe ser una url valida"}] 
      : error = [...error];
    !validateArray(genres, "number")
      ? error = [...error, {input: "genres", err:"genres debe ser un array de numeros y contener al menos 1 elemento"}] 
      : error = [...error];
    !validateArray(platforms, "number")
      ? error = [...error, {input: "platforms", err:"platforms debe ser un array de numeros y contener al menos 1 elemento"}] 
      : error = [...error];
    return error;
  }


module.exports = {
    validateDate,
    validateUrl,
    validateArray,
    validateText,
    validateNumber,
    validatePostVideogame,
}