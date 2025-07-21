const toZero: (month: number) => string = (month) => {
    if (month < 10) {
        return '0' + month;
    } else {
        return month.toString();
    }
}

export {
    toZero
}