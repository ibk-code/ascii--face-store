'use strict';

export function centsToDollars (cent) {
    let converted = (cent/100).toFixed(2);

    return `\$${converted}`
}

export function formatDateRelative(pdate) {
    let now = new Date();
    let productDate = new Date(pdate);
    let value;

    if (now.getDate() > productDate.getDate()) {
        value = convertTorelative(pdate)
        // console.log(value);
    }

    if(now.getDate() === productDate.getDate()) {
        value = convertTorelativeToday(pdate)
        // console.log(value);
    }

    return value;
}

function convertTorelative (date) {
    let now = new Date();
    let apiDate = new Date(date);

    let days = now.getDate() - apiDate.getDate()

    if (days <= 7) {
        return (
            days === 1 ? `${days} day ago` : `${days} days ago`
        );
    }else{
        return (
            apiDate.toLocaleDateString('en-GB', {  
                day : 'numeric',
                month : 'short',
                year : 'numeric'
            })
        );
    }
}

function convertTorelativeToday (date) {
    let now = new Date();
    let apiDate = new Date(date);
    let day = now.getDate() - apiDate.getDate();
    let hours = now.getHours() - apiDate.getHours();
    let minutes = now.getHours() - apiDate.getHours();
    let seconds = now.getHours() - apiDate.getHours();


    if(hours >= 1) {
        return ( hours === 1 ? `${hours} hour ago` : `${hours} hours ago` );
    }else{
        if(minutes > 0) {
            return ( minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`);
        }else{
            return ( seconds === 1 ? `${seconds} seconds ago` : `${seconds} seconds ago`);
        }
    }

    
}