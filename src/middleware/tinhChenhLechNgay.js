const tinhNgayChenhLech = (date) => {
    const now = new Date();
    const dates = new Date();

    // gan tham so dau vao cho dates
    dates.setFullYear(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(5, 7)) - 1,
        parseInt(date.substring(9))
    );

    const msChenhLech = now - dates;
    const ngayChenhLech =msChenhLech/(24*60*60*1000)
    return ngayChenhLech
};


module.exports = tinhNgayChenhLech
